import {
    ChangeDetectorRef,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef, ElementRef, Injectable,
    Injector,
    NgModuleRef,
    Type,
    ViewContainerRef, ViewRef
} from '@angular/core';
import { NgxComponentOutletAdapterRef } from './adapter-ref';
import { createFeatureComponents, resolveStrategy, StrategyConfig } from './lifecycle-strategies';

/**
 * @experimental
 */
export class DynamicComponentFactoryResolver implements ComponentFactoryResolver {
    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private host
    ) {}

    resolveComponentFactory<T>(component: Type<T>): DynamicComponentFactory<T> {
        const componentFactory: ComponentFactory<T> =
            this.componentFactoryResolver.resolveComponentFactory(component);

        return new DynamicComponentFactory(
            this.viewContainerRef, this.componentFactoryResolver, componentFactory, this.host);
    }
}

/**
 * @experimental
 */
export class DynamicComponentFactory<T> implements ComponentFactory<T> {

    get componentType(): Type<any> {
        return this.componentFactory.componentType;
    }

    get inputs(): { propName: string; templateName: string }[] {
        return this.componentFactory.inputs;
    }

    get ngContentSelectors(): string[] {
        return this.componentFactory.ngContentSelectors;
    }

    get outputs(): { propName: string; templateName: string }[] {
        return this.componentFactory.outputs;
    }

    get selector(): string {
        return this.componentFactory.selector;
    }

    get viewDefFactory(): any {
        return (this.componentFactory as any).viewDefFactory;
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private componentFactory: ComponentFactory<T>,
        private host: T
    ) {}

    create(
        injector: Injector,
        projectableNodes?: any[][],
        rootSelectorOrNode?: string | any,
        ngModule?: NgModuleRef<any>
    ): ComponentRef<T> {
        const componentRef: ComponentRef<T> = this.componentFactory.create(
            injector, projectableNodes, rootSelectorOrNode, ngModule);

        return new DynamicComponentRef(
            this.viewContainerRef, this.componentFactoryResolver, componentRef, this.host);
    }
}

/**
 * @experimental
 */
export class DynamicComponentRef<T> implements ComponentRef<T> {
    get changeDetectorRef(): ChangeDetectorRef {
        return this.componentRef.changeDetectorRef;
    }

    get componentType(): Type<T> {
        return this.componentRef.componentType;
    }

    get hostView(): ViewRef {
        return this.componentRef.hostView;
    }

    get injector(): Injector {
        return this.componentRef.injector;
    }

    get instance(): T {
        return this.componentRef.instance;
    }

    get location(): ElementRef {
        return this.componentRef.location;
    }

    get _elDef(): any {
        return (this.componentRef as any)._elDef;
    }

    private _onDestroy: Function;
    private componentAdapterRef: NgxComponentOutletAdapterRef<T>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private componentRef: ComponentRef<T>,
        host: T
    ) {
        const componentFactory: ComponentFactory<T> =
            componentFactoryResolver.resolveComponentFactory(this.componentType);

        const config = resolveStrategy(this.componentType);
        this.componentAdapterRef = this.createAdapterRef(
            componentFactory, componentRef, viewContainerRef,
            host, config, componentFactoryResolver);
    }

    updateContext(context) {
        this.componentAdapterRef.updateContext(context);
    }

    destroy(): void {
        if (this._onDestroy) {
            this._onDestroy();
        }
        this.componentAdapterRef.dispose();
    }

    onDestroy(callback: Function): void {
        this._onDestroy = callback;
    }

    private createAdapterRef<TComponent>(
        componentFactory: ComponentFactory<TComponent>,
        componentRef: ComponentRef<TComponent>,
        viewContainerRef: ViewContainerRef,
        host: TComponent,
        config: StrategyConfig,
        componentFactoryResolver: ComponentFactoryResolver
    ): NgxComponentOutletAdapterRef<TComponent> {
        const { onInitComponentRef, doCheckComponentRef } = createFeatureComponents(
            viewContainerRef,
            config,
            componentFactoryResolver
        );

        return new NgxComponentOutletAdapterRef({
            componentFactory, componentRef, host,
            onInitComponentRef, doCheckComponentRef
        });
    }
}

/**
 * @experimental
 */
@Injectable()
export class DynamicComponentAdapterBuilder {

    create<TComponent>(
        componentType: Type<TComponent>,
        viewContainerRef: ViewContainerRef,
        injector: Injector,
        projectableNodes: any[][],
        host: TComponent,
        componentFactoryResolver: ComponentFactoryResolver
    ): DynamicComponentRef<TComponent> {
        const dynamicComponentFactoryResolver = new DynamicComponentFactoryResolver(viewContainerRef, componentFactoryResolver, host);
        const componentFactory = dynamicComponentFactoryResolver.resolveComponentFactory(componentType);

        return viewContainerRef.createComponent(
            componentFactory, viewContainerRef.length, injector, projectableNodes) as DynamicComponentRef<TComponent>;
    }

}
