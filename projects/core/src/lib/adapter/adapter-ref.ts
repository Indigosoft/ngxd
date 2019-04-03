import { ChangeDetectorRef, ComponentFactory, ComponentRef, DoCheck, OnInit, SimpleChange } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { getPropertyDescriptor, hasProperty, markForCheckWrapper, onChangesWrapper, PRIVATE_PREFIX } from '../utils';

const PRIVATE_CONTEXT_PREFIX = '__ngxContext__';

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
    host: TComponent;
    onInitComponentRef?: ComponentRef<LifecycleComponent>;
    doCheckComponentRef?: ComponentRef<LifecycleComponent>;
}

const PRIVATE_HOST_ADAPTER = PRIVATE_CONTEXT_PREFIX + 'HOST_ADAPTER';
const PRIVATE_HOST_INPUT_ADAPTER = PRIVATE_CONTEXT_PREFIX + 'HOST_INPUT_ADAPTER';

class HostInputAdapter<TComponent> {
    changes: Subject<any>;
    defaultDescriptor: PropertyDescriptor;
    value: any;
    refCount: number;
    disposed = false;

    constructor(private host: TComponent, private name: string) {
        if (PRIVATE_HOST_INPUT_ADAPTER + name in host) {
            return host[ PRIVATE_HOST_INPUT_ADAPTER + name ];
        }

        host[ PRIVATE_HOST_INPUT_ADAPTER + name ] = this;

        this.changes = new Subject<any>();
        this.defaultDescriptor = getPropertyDescriptor(host, name);
        this.refCount = 0;

        const defaultValue = host[ name ];

        Object.defineProperty(host, name, {
            get: () => {
                if (this.defaultDescriptor && this.defaultDescriptor.get) {
                    return this.defaultDescriptor.get.call(host);
                }
                return this.value;
            },
            set: (value: any) => {
                if (this.defaultDescriptor && this.defaultDescriptor.set) {
                    this.defaultDescriptor.set.call(host, value);
                }

                this.value = value;
                this.changes.next(value);
            }
        });

        if (typeof defaultValue !== 'undefined') {
            host[ name ] = defaultValue;
        }
    }

    attach() {
        this.refCount++;
    }

    detach() {
        this.refCount--;

        if (this.refCount <= 0) {
            this.dispose();
        }
    }

    private dispose() {
        const defaultValue = this.host[ this.name ];

        this.disposed = true;
        this.changes.complete();
        delete this.host[ PRIVATE_HOST_INPUT_ADAPTER + this.name ];

        if (this.defaultDescriptor) {
            if (this.defaultDescriptor.writable) {
                this.defaultDescriptor.value = defaultValue;
            }
            Object.defineProperty(this.host, this.name, this.defaultDescriptor);
            if (this.defaultDescriptor.set) {
                this.host[ this.name ] = defaultValue;
            }
        } else {
            delete this.host[ this.name ];
            this.host[ this.name ] = defaultValue;
        }
    }
}

class HostAdapter<TComponent> {
    inputs: Map<string, HostInputAdapter<TComponent>>;
    state: any;
    refCount: number;

    constructor(private host: TComponent) {
        if (PRIVATE_HOST_ADAPTER in host) {
            return host[ PRIVATE_HOST_ADAPTER ];
        }

        this.inputs = new Map<string, HostInputAdapter<TComponent>>();
        this.state = {};
        this.refCount = 0;

        host[ PRIVATE_HOST_ADAPTER ] = this;
    }

    attach() {
        this.refCount++;
    }

    attachInput(name) {
        const adapter = new HostInputAdapter<TComponent>(this.host, name);
        adapter.attach();
        this.inputs.set(name, adapter);
    }

    getInputAdapter(name): HostInputAdapter<TComponent> {
        return this.inputs.get(name);
    }

    detachInput(name) {
        const adapter = this.inputs.get(name);
        adapter.detach();

        if (adapter.disposed) {
            this.inputs.delete(name);
        }
    }

    detach() {
        this.refCount--;

        if (this.refCount <= 0) {
            this.dispose();
        }
    }

    private dispose() {
        delete this.host[ PRIVATE_HOST_ADAPTER ];
    }
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
    private defaultDescriptors: DefaultComponentProperty[] = [];

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
        const props = context ? Object.keys(context) : [];
        for (const propName of props) {
            const descriptor = this.defaultDescriptors.find(_ => _.templateName === propName);
            this.defaultDescriptors = this.defaultDescriptors.filter(_ => _ !== descriptor);

            if (descriptor) {
                this.detachHostInput(propName);
            }

            const property = this.componentFactory.inputs.find(_ => _.templateName === propName);

            if (property && this.context[ property.templateName ] !== context[ propName ]) {
                this.context[ property.templateName ] = context[ propName ];
            }
        }
        for (const property of this.componentFactory.inputs) {
            const templateName = property.templateName;
            if (props.includes(templateName) || this.defaultDescriptors.find(_ => _.templateName === templateName )) {
                continue;
            }

            this.attachHostInput(property);
            const localContext = this.context;
            localContext[ templateName ] = this.host[ templateName ];

            const subscription = this.hostAdapter.getInputAdapter(templateName).changes.subscribe((value) => {
                localContext[ templateName ] = value;
            });

            this.attachedInputs.push(subscription);
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

    private attachHostInput(property: ComponentProperty): PropertyDescriptor {
        this.hostAdapter.attachInput(property.templateName);
        const adapterHostInput = this.hostAdapter.getInputAdapter(property.templateName);
        const defaultDescriptor: PropertyDescriptor = adapterHostInput.defaultDescriptor;
        this.defaultDescriptors.push(<DefaultComponentProperty>{ ...property, defaultDescriptor });
        return defaultDescriptor;
}

    private detachHostInput(templateName) {
        this.hostAdapter.detachInput(templateName);
    }

    private attachInputs(): void {
        this.defaultDescriptors = [];
        for (const property of this.componentFactory.inputs) {
            const defaultDescriptor: PropertyDescriptor = this.attachHostInput(property);
            this.attachInput(this.host, this.context, this.componentRef.instance, property, defaultDescriptor);
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
                if (instance[ propName ] === value) {
                    return void 0;
                }

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

        const subscription = this.hostAdapter.getInputAdapter(templateName).changes.subscribe((value) => {
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
        for (const descriptor of this.defaultDescriptors) {
            this.detachHostInput(descriptor.templateName);
        }

        for (const subscription of this.attachedInputs) {
            subscription.unsubscribe();
        }

        this.attachedInputs.splice(0);
    }

    private attachOutputs(): void {
        for (const property of this.componentFactory.outputs) {
            if (property.templateName in this.host) {
                const subscription = this.componentRef.instance[ property.propName ]
                    .subscribe(this.host[ property.templateName ]);
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
