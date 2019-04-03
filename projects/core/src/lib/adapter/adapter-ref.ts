import { ChangeDetectorRef, ComponentFactory, ComponentRef, SimpleChange, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyDef, hasProperty, markForCheckWrapper, onChangesWrapper, PRIVATE_PREFIX, toPropertyDef } from '../utils';
import { HostAdapter } from './host.adapter';
import { LifecycleComponent } from './lifecycle.strategies';

interface BindingDef extends PropertyDef {
    defaultDescriptor: PropertyDescriptor;
}

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
    context: TComponent = {} as any;

    private onInitComponentRef: ComponentRef<LifecycleComponent>;
    private doCheckComponentRef: ComponentRef<LifecycleComponent>;
    private changeDetectorRef: ChangeDetectorRef;
    private attachedInputs: Subscription[] = [];
    private attachedOutputs: Subscription[] = [];
    private bindingDefs: BindingDef[] = [];

    private hostAdapter: HostAdapter<TComponent>;

    constructor(config: NgxComponentOutletAdapterRefConfig<TComponent>) {
        this.componentFactory = config.componentFactory;
        this.componentRef = config.componentRef;
        this.host = config.host;
        this.onInitComponentRef = config.onInitComponentRef || this.componentRef as any;
        this.doCheckComponentRef = config.doCheckComponentRef || this.componentRef as any;
        this.changeDetectorRef = this.componentRef.injector.get<ChangeDetectorRef>(
            ChangeDetectorRef as Type<ChangeDetectorRef>,
            this.componentRef.changeDetectorRef
        );

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

    updateContext(context): void {
        const contextProps = context ? Object.keys(context) : [];
        for (const contextPropName of contextProps) {
            const bindingDef = this.bindingDefs.find(_ => _.outsidePropName === contextPropName);
            this.bindingDefs = this.bindingDefs.filter(_ => _ !== bindingDef);
            if (bindingDef) {
                this.detachHostInput(bindingDef);
            }

            const propertyDef = this.componentFactory.inputs.map(toPropertyDef)
                                          .find(_ => _.outsidePropName === contextPropName);
            if (propertyDef && this.context[ propertyDef.outsidePropName ] !== context[ contextPropName ]) {
                this.context[ propertyDef.outsidePropName ] = context[ contextPropName ];
            }
        }
        for (const property of this.componentFactory.inputs) {
            const propertyDef = toPropertyDef(property);
            const attachedByContext = contextProps.indexOf(propertyDef.outsidePropName) > -1 ||
                this.bindingDefs.find(_ => _.outsidePropName === propertyDef.outsidePropName );
            if (attachedByContext) {
                continue;
            }

            const bindingDef: BindingDef = this.attachHostInput(propertyDef);
            this.attachInput(bindingDef);
        }
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
        const adapterHostInput = this.hostAdapter.attachInput(propertyDef);
        const bindingDef: BindingDef = { ...propertyDef, defaultDescriptor: adapterHostInput.defaultDescriptor };
        this.bindingDefs.push(bindingDef);
        return bindingDef;
}

    private detachHostInput(propertyDef: PropertyDef): void {
        this.hostAdapter.detachInput(propertyDef);
    }

    private attachInputs(): void {
        this.bindingDefs = [];
        for (const property of this.componentFactory.inputs) {
            const propertyDef = toPropertyDef(property);
            const bindingDef: BindingDef = this.attachHostInput(propertyDef);
            this.attachInput(bindingDef);
        }
    }

    private attachInput(bindingDef: BindingDef) {
        const { insidePropName, outsidePropName, defaultDescriptor } = bindingDef;
        const containerContext = this.host;
        const context: TComponent = this.context;
        const instance: TComponent = this.componentRef.instance;
        const defaultValue = containerContext[ outsidePropName ];

        Object.defineProperty(context, outsidePropName, {
            get: () => {
                if (defaultDescriptor && defaultDescriptor.get) {
                    return defaultDescriptor.get.call(context);
                } else {
                    return instance[ insidePropName ];
                }
            },
            set: (value: any) => {
                if (instance[ insidePropName ] === value) {
                    return void 0;
                }

                let simpleChanges = instance[ PRIVATE_PREFIX ];

                if (simpleChanges == null) {
                    simpleChanges = instance[ PRIVATE_PREFIX ] = {};
                }

                const isFirstChange = !(instance[ `${PRIVATE_PREFIX}_${outsidePropName}` ]);
                instance[ `${PRIVATE_PREFIX}_${outsidePropName}` ] = true;

                simpleChanges[ outsidePropName ] = new SimpleChange(instance[ insidePropName ], value, isFirstChange);

                if (defaultDescriptor && defaultDescriptor.set) {
                    defaultDescriptor.set.call(context, value);
                }

                instance[ insidePropName ] = value;
            }
        });

        if (typeof defaultValue !== 'undefined') {
            context[ outsidePropName ] = defaultValue;
        }

        const subscription = this.hostAdapter.getInputAdapter(bindingDef).changes.subscribe((value) => {
            context[ outsidePropName ] = value;
        });

        this.attachedInputs.push(subscription);
    }

    private attachLifecycle(): void {
        const instance: TComponent & LifecycleComponent = this.componentRef.instance as any;

        if (hasProperty(this.componentRef.componentType.prototype, 'ngOnChanges')) {
            const markForCheckWrapped = markForCheckWrapper(instance.ngDoCheck, this.changeDetectorRef).bind(instance);

            this.onInitComponentRef.instance.ngOnInit = onChangesWrapper(instance.ngOnInit).bind(instance);
            this.doCheckComponentRef.instance.ngDoCheck = onChangesWrapper(markForCheckWrapped).bind(instance);
        } else {
            this.doCheckComponentRef.instance.ngDoCheck = markForCheckWrapper(instance.ngDoCheck, this.changeDetectorRef).bind(instance);
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
                const subscription = this.componentRef.instance[ propertyDef.insidePropName ]
                    .subscribe(this.host[ propertyDef.outsidePropName ]);
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
