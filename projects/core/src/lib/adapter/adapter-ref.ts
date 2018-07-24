import { ChangeDetectorRef, ComponentFactory, ComponentRef, DoCheck, EmbeddedViewRef, OnInit, SimpleChange } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { getPropertyDescriptor, hasProperty, markForCheckWrapper, onChangesWrapper, PRIVATE_PREFIX } from '../utils';

const PRIVATE_CONTEXT_PREFIX = '__ngxContext__';
const PRIVATE_CONTEXT_REF_COUNT = PRIVATE_CONTEXT_PREFIX + 'RefCount';
const PRIVATE_CONTEXT_INPUT_REF_COUNTS = PRIVATE_CONTEXT_PREFIX + 'Input_RefCount';
const PRIVATE_CONTEXT_DEFAULT = PRIVATE_CONTEXT_PREFIX + 'Default';
const PRIVATE_CONTEXT_CURRENT = PRIVATE_CONTEXT_PREFIX + 'Current';
const PRIVATE_CONTEXT_CHANGES = PRIVATE_CONTEXT_PREFIX + 'OnChanges';

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
    containerContext: TComponent;
    context: TComponent = {} as any;

    private onInitComponentRef: ComponentRef<LifecycleComponent>;
    private doCheckComponentRef: ComponentRef<LifecycleComponent>;
    private changeDetectorRef: ChangeDetectorRef;
    private attachedInputs: Subscription[] = [];
    private attachedOutputs: Subscription[] = [];
    private defaultDescriptors: DefaultComponentProperty[] = [];

    constructor(config: NgxComponentOutletAdapterRefConfig<TComponent>) {
        this.componentFactory = config.componentFactory;
        this.componentRef = config.componentRef;
        this.containerContext = config.context;
        this.onInitComponentRef = config.onInitComponentRef || this.componentRef as any;
        this.doCheckComponentRef = config.doCheckComponentRef || this.componentRef as any;
        this.changeDetectorRef = this.componentRef.injector.get(ChangeDetectorRef, this.componentRef.changeDetectorRef);

        this.attachContext();
        this.attachInputs();
        this.attachLifecycle();
        this.attachOutputs();
    }

    dispose(): void {
        this.disposeOutputs();
        this.disposeInputs();
        this.detachContext();

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
        if (!context) {
            return;
        }

        for (const propName in context) {
            if (this.hasAttachedContextInput(propName)) {
                this.detachContextInput(propName);
            }

            if (this.context.hasOwnProperty(propName)) {
                this.context[ propName ] = context[ propName ];
            }
        }
    }

    private attachContext(): void {
        if (!this.containerContext) {
            return;
        }

        if (this.containerContext.hasOwnProperty(PRIVATE_CONTEXT_CHANGES)) {
            this.containerContext[PRIVATE_CONTEXT_REF_COUNT]++;
            return;
        }

        const $__CURRENT = {};
        const $__CHANGES = new Map<string, Subject<any>>();
        const $__DEFAULT = new Map<string, PropertyDescriptor>();
        const $__REF_COUNT = 1;
        const $__InputRefCounts = new Map<string, number>();

        this.containerContext[ PRIVATE_CONTEXT_CURRENT ] = $__CURRENT;
        this.containerContext[ PRIVATE_CONTEXT_CHANGES ] = $__CHANGES;
        this.containerContext[ PRIVATE_CONTEXT_DEFAULT ] = $__DEFAULT;
        this.containerContext[ PRIVATE_CONTEXT_REF_COUNT ] = $__REF_COUNT;
        this.containerContext[ PRIVATE_CONTEXT_INPUT_REF_COUNTS ] = $__InputRefCounts;
    }

    private hasAttachedContext(): boolean {
        return this.containerContext.hasOwnProperty(PRIVATE_CONTEXT_DEFAULT);
    }

    private detachContext(): void {
        if (!this.containerContext) {
            return;
        }

        if (!this.hasAttachedContext()) {
            return;
        }

        this.containerContext[PRIVATE_CONTEXT_REF_COUNT]--;

        if (this.containerContext[PRIVATE_CONTEXT_REF_COUNT] > 0) {
            return;
        }

        for (const propName in this.containerContext[ PRIVATE_CONTEXT_DEFAULT ]) {
            this.detachContextInput(propName);
        }

        for (const $__CHANGE of this.containerContext[ PRIVATE_CONTEXT_CHANGES ]) {
            $__CHANGE.complete();
        }

        delete this.containerContext[ PRIVATE_CONTEXT_CURRENT ];
        delete this.containerContext[ PRIVATE_CONTEXT_CHANGES ];
        delete this.containerContext[ PRIVATE_CONTEXT_DEFAULT ];
        delete this.containerContext[ PRIVATE_CONTEXT_INPUT_REF_COUNTS ];
        delete this.containerContext[ PRIVATE_CONTEXT_REF_COUNT ];
    }

    private hasAttachedContextInput(propName) {
        console.log(this.containerContext[ PRIVATE_CONTEXT_CHANGES ], propName);
        return this.containerContext[ PRIVATE_CONTEXT_CHANGES ].has(propName);
    }

    private attachContextInput(propName) {
        const defaultValue = this.containerContext[ propName ];
        const defaultDescriptor = getPropertyDescriptor(this.containerContext, propName);

        const $__CURRENT = this.containerContext[ PRIVATE_CONTEXT_CURRENT ];
        const $__CHANGES = this.containerContext[ PRIVATE_CONTEXT_CHANGES ];
        const $__DEFAULT = this.containerContext[ PRIVATE_CONTEXT_DEFAULT ];
        const $__InputRefCounts = this.containerContext[ PRIVATE_CONTEXT_INPUT_REF_COUNTS ];

        const $__CHANGE = new Subject<any>();

        $__CHANGES.set(propName, $__CHANGE);
        $__DEFAULT.set(propName, defaultDescriptor);
        $__InputRefCounts.set(propName, ($__InputRefCounts.get(propName) || 0) + 1);

        console.info('attach', this.containerContext, JSON.stringify($__DEFAULT), getPropertyDescriptor(this.containerContext, propName));

        Object.defineProperty(this.containerContext, propName, {
            get: () => {
                if (defaultDescriptor && defaultDescriptor.get) {
                    return defaultDescriptor.get.call(this.containerContext);
                }
                return $__CURRENT[ propName ];
            },
            set: (value: any) => {
                if (defaultDescriptor && defaultDescriptor.set) {
                    defaultDescriptor.set.call(this.containerContext);
                }

                $__CURRENT[ propName ] = value;
                $__CHANGE.next(value);
            }
        });

        if (typeof defaultValue !== 'undefined') {
            this.containerContext[ propName ] = defaultValue;
        }
    }

    private detachContextInput(propName) {
        const defaultValue = this.containerContext[ propName ];
        const $__CURRENT = this.containerContext[ PRIVATE_CONTEXT_CURRENT ];
        const $__CHANGES = this.containerContext[ PRIVATE_CONTEXT_CHANGES ];
        const $__DEFAULT = this.containerContext[ PRIVATE_CONTEXT_DEFAULT ];
        const $__InputRefCounts = this.containerContext[ PRIVATE_CONTEXT_INPUT_REF_COUNTS ];

        $__InputRefCounts.set(propName, $__InputRefCounts.get(propName) - 1);

        if ($__InputRefCounts.get(propName) > 0) {
            return;
        }

        const defaultDescriptor: PropertyDescriptor = $__DEFAULT.get(propName);

        console.info('detach', JSON.stringify($__DEFAULT), getPropertyDescriptor(this.containerContext, propName));

        if (defaultDescriptor) {
            Object.defineProperty(this.containerContext, propName, $__DEFAULT.get(propName));
        } else {
            delete this.containerContext[propName];
        }

        delete $__CURRENT[propName];
        $__CHANGES.delete(propName);
        $__DEFAULT.delete(propName);
        $__InputRefCounts.delete(propName);

        this.containerContext[ propName ] = defaultValue;
    }

    private attachInputs(): void {
        this.defaultDescriptors = [];
        for (const property of this.componentFactory.inputs) {
            const defaultDescriptor: PropertyDescriptor = getPropertyDescriptor(this.context, property.templateName);

            if (!this.hasAttachedContextInput(property.templateName)) {
                console.info('has attached', this.hasAttachedContextInput(property.templateName));
                this.attachContextInput(property.templateName);
            }

            this.attachInput(this.containerContext, this.context, this.componentRef.instance, property, defaultDescriptor);

            this.defaultDescriptors.push(<DefaultComponentProperty>{ ...property, defaultDescriptor });
        }
    }

    private attachInput(
        containerContext: TComponent, context: TComponent, instance: TComponent,
        { propName, templateName }: ComponentProperty,
        defaultDescriptor: PropertyDescriptor
    ) {
        const defaultValue = containerContext[ templateName ];

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

        const subscription = containerContext[PRIVATE_CONTEXT_CHANGES].get(templateName).subscribe((value) => {
            context[ templateName ] = value;
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
        const instance: TComponent & LifecycleComponent = this.componentRef.instance as any;

        for (const descriptor of this.defaultDescriptors) {
            if (descriptor.defaultDescriptor) {
                if (descriptor.defaultDescriptor.writable) {
                    descriptor.defaultDescriptor.value = instance[ descriptor.propName ];
                }
                Object.defineProperty(this.containerContext, descriptor.templateName, descriptor.defaultDescriptor);
                if (descriptor.defaultDescriptor.set) {
                    this.containerContext[ descriptor.templateName ] = instance[ descriptor.propName ];
                }
            } else {
                delete this.containerContext[ descriptor.templateName ];
                this.containerContext[ descriptor.templateName ] = instance[ descriptor.propName ];
            }
        }

        for (const subscription of this.attachedInputs) {
            subscription.unsubscribe();
        }
        this.attachedInputs.splice(0);
    }

    private attachOutputs(): void {
        for (const property of this.componentFactory.outputs) {
            if (this.containerContext.hasOwnProperty(property.templateName)) {
                this.componentRef.instance[ property.propName ]
                    .subscribe(this.containerContext[ property.templateName ]);
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
