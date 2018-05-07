import { ChangeDetectorRef, ComponentFactory, ComponentRef, DoCheck, OnInit, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { getPropertyDescriptor, hasProperty, markForCheckWrapper, onChangesWrapper, PRIVATE_PREFIX } from '../utils';

export type LifecycleComponent = OnInit & DoCheck | OnInit | DoCheck | any;

interface ComponentProperty {
    propName: string;
    templateName: string;
}

interface DefaultComponentProperty extends ComponentProperty {
    defaultDescriptor: PropertyDescriptor;
}

export interface NgxComponentOutletAdapterRefConfig<TComponent> {
    componentFactory: ComponentFactory<TComponent>;
    componentRef: ComponentRef<TComponent>;
    context: TComponent;
    onInitComponentRef?: ComponentRef<LifecycleComponent>;
    doCheckComponentRef?: ComponentRef<LifecycleComponent>;
}

export class NgxComponentOutletAdapterRef<TComponent> {

    componentFactory: ComponentFactory<TComponent>;
    componentRef: ComponentRef<TComponent>;
    context: TComponent;

    private onInitComponentRef: ComponentRef<LifecycleComponent>;
    private doCheckComponentRef: ComponentRef<LifecycleComponent>;
    private changeDetectorRef: ChangeDetectorRef;
    private attachedOutputs: Subscription[] = [];
    private defaultDescriptors: DefaultComponentProperty[] = [];

    constructor(config: NgxComponentOutletAdapterRefConfig<TComponent>) {
        this.componentFactory = config.componentFactory;
        this.componentRef = config.componentRef;
        this.context = config.context;
        this.onInitComponentRef = config.onInitComponentRef || this.componentRef as any;
        this.doCheckComponentRef = config.doCheckComponentRef || this.componentRef as any;
        this.changeDetectorRef = this.componentRef.injector.get(ChangeDetectorRef, this.componentRef.changeDetectorRef);

        this.attachInputs();
        this.attachLifecycle();
        this.attachOutputs();
    }

    dispose(): void {
        this.disposeOutputs();
        this.disposeInputs();

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

    private attachInputs(): void {
        const inputs: ComponentProperty[] = this.componentFactory.inputs;

        this.defaultDescriptors = inputs.map((property: ComponentProperty): DefaultComponentProperty => {
            const defaultDescriptor: PropertyDescriptor = getPropertyDescriptor(this.context, property.templateName);

            this.attachInput(this.context, this.componentRef.instance, property, defaultDescriptor);

            return <DefaultComponentProperty>{ ...property, defaultDescriptor };
        });
    }

    private attachInput(
        context: TComponent, instance: TComponent,
        { propName, templateName }: ComponentProperty,
        defaultDescriptor: PropertyDescriptor
    ) {
        const defaultValue = context[ templateName ];

        Object.defineProperty(context, templateName, {
            get: () => {
                if (defaultDescriptor && defaultDescriptor.get) {
                    return defaultDescriptor.get.call(context);
                } else {
                    return instance[ propName ];
                }
            },
            set: (value: any) => {
                let simpleChanges = instance[ PRIVATE_PREFIX ];

                if (simpleChanges == null) {
                    simpleChanges = instance[ PRIVATE_PREFIX ] = {};
                }

                const isFirstChange = !(instance[ `${PRIVATE_PREFIX}_${templateName}` ]);
                instance[ `${PRIVATE_PREFIX}_${templateName}` ] = true;

                simpleChanges[ templateName ] = new SimpleChange(instance[ propName ], value, isFirstChange);

                if (defaultDescriptor && defaultDescriptor.set) {
                    defaultDescriptor.set.call(context, value);
                }

                instance[ propName ] = value;
            }
        });

        if (typeof defaultValue !== 'undefined') {
            context[ templateName ] = defaultValue;
        }
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
        const instance: TComponent & LifecycleComponent = this.componentRef.instance as any;

        this.defaultDescriptors.forEach(({ propName, templateName, defaultDescriptor }) => {
            if (defaultDescriptor) {
                Object.defineProperty(this.context, templateName, defaultDescriptor);
                if (defaultDescriptor.set) {
                    this.context[ templateName ] = instance[ propName ];
                }
            } else {
                delete this.context[ templateName ];
                this.context[ templateName ] = instance[ propName ];
            }
        });
    }

    private attachOutputs(): void {
        const availableOutputs: ComponentProperty[] = this.componentFactory.outputs.filter(
            (property: ComponentProperty) => this.context.hasOwnProperty(property.templateName));

        this.attachedOutputs = availableOutputs.map((property: ComponentProperty) =>
            this.componentRef.instance[ property.propName ].subscribe(this.context[ property.templateName ]));
    }

    private disposeOutputs(): void {
        this.attachedOutputs.splice(0).forEach((subscription) => subscription.unsubscribe());
    }

}
