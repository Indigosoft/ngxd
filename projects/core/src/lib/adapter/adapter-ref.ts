import {
  ChangeDetectorRef,
  ComponentFactory,
  ComponentRef,
  isDevMode,
  SimpleChange,
  Type,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  BindingDef,
  hasProperty,
  markForCheckWrapper,
  onChangesWrapper,
  PRIVATE_PREFIX,
  PropertyDef,
  toPropertyDef,
} from '../utils';
import { HostAdapter } from './host.adapter';
import { isLifeCycleComponent } from './lifecycle.components';
import { LifecycleComponent } from './lifecycle.strategies';

export interface NgxComponentOutletAdapterRefConfig<TComponent> {
  componentFactory: ComponentFactory<TComponent>;
  componentRef: ComponentRef<TComponent>;
  host: TComponent;
  onInitComponentRef?: ComponentRef<LifecycleComponent>;
  doCheckComponentRef?: ComponentRef<LifecycleComponent>;
}

export class NgxComponentOutletAdapterRef<TComponent> {
  componentFactory: ComponentFactory<TComponent>;
  componentRef: ComponentRef<TComponent>;
  host: TComponent;
  context: Partial<TComponent> = {};

  private onInitComponentRef: ComponentRef<LifecycleComponent>;
  private doCheckComponentRef: ComponentRef<LifecycleComponent>;
  private changeDetectorRef: ChangeDetectorRef;
  private attachedInputs: Subscription[] = [];
  private attachedOutputs: Subscription[] = [];
  private propertyDefs: PropertyDef[] = [];
  private bindingDefs: BindingDef[] = [];

  private hostAdapter: HostAdapter<TComponent>;

  constructor(config: NgxComponentOutletAdapterRefConfig<TComponent>) {
    this.componentFactory = config.componentFactory;
    this.componentRef = config.componentRef;
    this.host = config.host;
    this.onInitComponentRef = config.onInitComponentRef || (this.componentRef as any);
    this.doCheckComponentRef = config.doCheckComponentRef || (this.componentRef as any);
    this.changeDetectorRef = this.componentRef.injector.get<ChangeDetectorRef>(
      ChangeDetectorRef as Type<ChangeDetectorRef>,
      this.componentRef.changeDetectorRef
    );
    this.propertyDefs = this.componentFactory.inputs.map(toPropertyDef);

    this.attachHost();
    this.attachInputs();
    this.attachLifecycle();
    this.attachOutputs();
  }

  dispose(): void {
    this.disposeOutputs();
    this.disposeInputs();
    this.detachHost();

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    if (this.onInitComponentRef) {
      this.onInitComponentRef.destroy();
      this.onInitComponentRef = null;
    }

    if (this.doCheckComponentRef) {
      this.doCheckComponentRef.destroy();
      this.doCheckComponentRef = null;
    }
  }

  updateContext(context: Partial<TComponent>): void {
    const contextProps = context ? Object.keys(context) : [];
    for (const contextPropName of contextProps) {
      const bindingDef = this.getBindingDef(contextPropName);
      if (bindingDef) {
        this.detachHostInput(bindingDef);
      }

      const propertyDef = this.getPropertyDef(contextPropName);
      if (propertyDef && this.context[propertyDef.outsidePropName] !== context[contextPropName]) {
        this.context[propertyDef.outsidePropName] = context[contextPropName];
      }
    }

    const unattachedProps = this.propertyDefs.filter(
      propertyDef =>
        !(
          contextProps.indexOf(propertyDef.outsidePropName) > -1 ||
          this.getBindingDef(propertyDef.outsidePropName)
        )
    );
    for (const propertyDef of unattachedProps) {
      const bindingDef: BindingDef = this.attachHostInput(propertyDef);
      this.attachInput(bindingDef);
    }
  }

  private getPropertyDef(outsidePropName: string): PropertyDef {
    return this.propertyDefs.find(_ => _.outsidePropName === outsidePropName);
  }

  private getBindingDef(outsidePropName: string): BindingDef {
    return this.bindingDefs.find(_ => _.outsidePropName === outsidePropName);
  }

  private attachHost(): void {
    this.hostAdapter = new HostAdapter<TComponent>(this.host);
    this.hostAdapter.attach();
  }

  private detachHost(): void {
    this.hostAdapter.detach();
    this.hostAdapter = null;
  }

  private attachHostInput(propertyDef: PropertyDef): BindingDef {
    const bindingDef: BindingDef = this.hostAdapter.attachInput(propertyDef);
    this.bindingDefs.push(bindingDef);
    return bindingDef;
  }

  private detachHostInput(bindingDef: BindingDef): void {
    this.hostAdapter.detachInput(bindingDef);
    this.bindingDefs = this.bindingDefs.filter(_ => _ !== bindingDef);
  }

  private attachInputs(): void {
    this.bindingDefs = [];
    for (const propertyDef of this.propertyDefs) {
      const bindingDef: BindingDef = this.attachHostInput(propertyDef);
      this.attachContextPropertyToComponentInput(bindingDef);
      this.attachInput(bindingDef);
    }
  }

  private attachInput(bindingDef: BindingDef) {
    const host = this.host;
    const hostAdapter = this.hostAdapter;
    const context: Partial<TComponent> = this.context;
    const defaultValue = host[bindingDef.outsidePropName];

    if (typeof defaultValue !== 'undefined') {
      context[bindingDef.outsidePropName] = defaultValue;
    }

    const subscription = hostAdapter.getInputAdapter(bindingDef).changes.subscribe(value => {
      context[bindingDef.outsidePropName] = value;
    });

    this.attachedInputs.push(subscription);
  }

  private attachContextPropertyToComponentInput(bindingDef: BindingDef): void {
    const { insidePropName, outsidePropName, defaultDescriptor } = bindingDef;
    const context: Partial<TComponent> = this.context;
    const instance: TComponent = this.componentRef.instance;
    Object.defineProperty(context, outsidePropName, {
      get: () => {
        if (defaultDescriptor && defaultDescriptor.get) {
          return defaultDescriptor.get.call(context);
        } else {
          return instance[insidePropName];
        }
      },
      set: (value: any) => {
        if (instance[insidePropName] === value) {
          return void 0;
        }

        let simpleChanges = instance[PRIVATE_PREFIX];

        if (simpleChanges == null) {
          simpleChanges = instance[PRIVATE_PREFIX] = {};
        }

        const isFirstChange = !instance[`${PRIVATE_PREFIX}_${outsidePropName}`];
        instance[`${PRIVATE_PREFIX}_${outsidePropName}`] = true;

        simpleChanges[outsidePropName] = new SimpleChange(
          instance[insidePropName],
          value,
          isFirstChange
        );

        if (defaultDescriptor && defaultDescriptor.set) {
          defaultDescriptor.set.call(context, value);
        }

        try {
          instance[insidePropName] = value;
        } catch (e) {
          // Todo: add more debug
          if (isDevMode()) {
            const constructorName = (instance as any).constructor.name;
            console.log(`You should use get and set descriptors both with dynamic components:
ERROR: not found '${insidePropName}' input, it has getter only, please add setter!

  class ${constructorName} {

    get ${insidePropName}() { ... }

    // Please add that 👇
    set ${insidePropName}() { ... }

  }`);
            console.error(e);
          }
        }
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  private attachLifecycle(): void {
    const instance: TComponent & LifecycleComponent = this.componentRef.instance as any;

    if (hasProperty(this.componentRef.componentType.prototype, 'ngOnChanges')) {
      if (isLifeCycleComponent(this.onInitComponentRef.instance)) {
        this.onInitComponentRef.instance.attach(instance, this.changeDetectorRef);
      } else {
        // this.onInitComponentRef.instance.ngOnInit = onChangesWrapper(instance.ngOnInit).bind(
        //   instance
        // );
        console.warn('todo: add for OnInit on dynamic component');
      }

      if (isLifeCycleComponent(this.doCheckComponentRef.instance)) {
        this.doCheckComponentRef.instance.attach(instance, this.changeDetectorRef);
      } else {
        // this.doCheckComponentRef.instance.ngDoCheck = onChangesWrapper(markForCheckWrapped).bind(
        //   instance
        // );
        console.warn('todo: add for DoCheck on dynamic component');
      }
    } else {
      this.doCheckComponentRef.instance.ngDoCheck = markForCheckWrapper(
        instance.ngDoCheck,
        this.changeDetectorRef
      ).bind(instance);
    }
  }

  private disposeInputs(): void {
    for (const bindingDef of this.bindingDefs) {
      this.detachHostInput(bindingDef);
    }

    for (const subscription of this.attachedInputs) {
      subscription.unsubscribe();
    }

    this.attachedInputs.splice(0);
  }

  private attachOutputs(): void {
    const propertyDefs = this.componentFactory.outputs.map(toPropertyDef);
    for (const propertyDef of propertyDefs) {
      if (propertyDef.outsidePropName in this.host) {
        const subscription = this.componentRef.instance[propertyDef.insidePropName].subscribe(
          this.host[propertyDef.outsidePropName]
        );
        this.attachedOutputs.push(subscription);
      }
    }
  }

  private disposeOutputs(): void {
    for (const subscription of this.attachedOutputs) {
      subscription.unsubscribe();
    }
    this.attachedOutputs.splice(0);
  }
}
