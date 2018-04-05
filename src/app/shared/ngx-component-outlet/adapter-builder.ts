import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';

import { NgxComponentOutletAdapterBuilderStrategy, NgxComponentOutletAdapterBuilderStrategyResolver } from './adapter-builder-strategies';
import { NgxComponentOutletAdapterRef } from './adapter-ref';

@Injectable()
export class NgxComponentOutletAdapterBuilder {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private adapterBuilderStrategyResolver: NgxComponentOutletAdapterBuilderStrategyResolver
    ) {}

    create<TComponent>(
        component: Type<TComponent>,
        viewContainerRef: ViewContainerRef,
        injector: Injector,
        projectableNodes: any[][],
        context: TComponent
    ): NgxComponentOutletAdapterRef<TComponent> {
        if (!component) {
            return null;
        }

        const componentFactory: ComponentFactory<TComponent> =
            this.componentFactoryResolver.resolveComponentFactory(component);

        const componentRef: ComponentRef<TComponent> =
            viewContainerRef.createComponent(
                componentFactory, viewContainerRef.length, injector,
                projectableNodes
            );

        const strategy: NgxComponentOutletAdapterBuilderStrategy =
            this.adapterBuilderStrategyResolver.resolve(component);

        return strategy.create(component, componentFactory, componentRef, viewContainerRef, context);
    }

}
