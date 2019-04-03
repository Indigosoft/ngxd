import { ChangeDetectorRef, ComponentFactory, ComponentRef, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentProperty, hasProperty, markForCheckWrapper, onChangesWrapper, PRIVATE_PREFIX, toComponentProperty } from '../utils';
import { HostAdapter } from './host.adapter';
import { LifecycleComponent } from './lifecycle.strategies';

interface DefaultComponentProperty extends ComponentProperty {
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
    private defaultComponentProperties: DefaultComponentProperty[] = [];

    private hostAdapter: HostAdapter<TComponent>;

    constructor(config: NgxComponentOutletAdapterRefConfig<TComponent>) {
        this.componentFactory = config.componentFactory;
        this.componentRef = config.componentRef;
        this.host = config.host;
        this.onInitComponentRef = config.onInitComponentRef || this.componentRef as any;
        this.doCheckComponentRef = config.doCheckComponentRef || this.componentRef as any;
        this.changeDetectorRef = this.componentRef.injector.get(ChangeDetectorRef, this.componentRef.changeDetectorRef);

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
            const defaultComponentProperty = this.defaultComponentProperties.find(_ => _.outsidePropName === contextPropName);
            this.defaultComponentProperties = this.defaultComponentProperties.filter(_ => _ !== defaultComponentProperty);

            if (defaultComponentProperty) {
                this.detachHostInput(defaultComponentProperty);
            }

            const componentProperty = this.componentFactory.inputs.map(toComponentProperty)
                                          .find(_ => _.outsidePropName === contextPropName);

            if (componentProperty && this.context[ componentProperty.outsidePropName ] !== context[ contextPropName ]) {
                this.context[ componentProperty.outsidePropName ] = context[ contextPropName ];
            }
        }
        for (const property of this.componentFactory.inputs) {
            const componentProperty = toComponentProperty(property);
            const attachedByContext = contextProps.indexOf(componentProperty.outsidePropName) > -1 ||
                this.defaultComponentProperties.find(_ => _.outsidePropName === componentProperty.outsidePropName );
            if (attachedByContext) {
                continue;
            }

            const defaultComponentProperty: DefaultComponentProperty = this.attachHostInput(componentProperty);
            this.attachInput(defaultComponentProperty);
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

    private attachHostInput(property: ComponentProperty): DefaultComponentProperty {
        this.hostAdapter.attachInput(property.outsidePropName);
        const adapterHostInput = this.hostAdapter.getInputAdapter(property.outsidePropName);
        const defaultDescriptor: PropertyDescriptor = adapterHostInput.defaultDescriptor;
        const defaultComponentProperty = { ...property, defaultDescriptor };
        this.defaultComponentProperties.push(defaultComponentProperty);
        return defaultComponentProperty;
}

    private detachHostInput(componentProperty: ComponentProperty): void {
        this.hostAdapter.detachInput(componentProperty.outsidePropName);
    }

    private attachInputs(): void {
        this.defaultComponentProperties = [];
        for (const property of this.componentFactory.inputs) {
            const componentProperty = toComponentProperty(property);
            const defaultComponentProperty: DefaultComponentProperty = this.attachHostInput(componentProperty);
            this.attachInput(defaultComponentProperty);
        }
    }

    private attachInput({ insidePropName, outsidePropName, defaultDescriptor }: DefaultComponentProperty) {
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

        const subscription = this.hostAdapter.getInputAdapter(outsidePropName).changes.subscribe((value) => {
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
        for (const descriptor of this.defaultComponentProperties) {
            this.detachHostInput(descriptor);
        }

        for (const subscription of this.attachedInputs) {
            subscription.unsubscribe();
        }

        this.attachedInputs.splice(0);
    }

    private attachOutputs(): void {
        const componentProps = this.componentFactory.outputs.map(toComponentProperty);
        for (const property of componentProps) {
            if (property.outsidePropName in this.host) {
                const subscription = this.componentRef.instance[ property.insidePropName ]
                    .subscribe(this.host[ property.outsidePropName ]);
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
