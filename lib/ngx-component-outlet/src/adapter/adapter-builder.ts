import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { NgxComponentOutletAdapterBuilderStrategy, NgxComponentOutletAdapterBuilderStrategyResolver } from './adapter-strategy';
import { NgxComponentOutletAdapterRef } from './adapter-ref';

@Injectable()
export class NgxComponentOutletAdapterBuilder {

    constructor(private adapterBuilderStrategyResolver: NgxComponentOutletAdapterBuilderStrategyResolver) {}

    create<TComponent>(
        componentType: Type<TComponent>,
        viewContainerRef: ViewContainerRef,
        injector: Injector,
        projectableNodes: any[][],
        context: TComponent,
        componentFactoryResolver: ComponentFactoryResolver
    ): NgxComponentOutletAdapterRef<TComponent> {
        const componentFactory: ComponentFactory<TComponent> =
            componentFactoryResolver.resolveComponentFactory(componentType);

        const componentRef: ComponentRef<TComponent> =
            viewContainerRef.createComponent(
                componentFactory, viewContainerRef.length, injector,
                projectableNodes
            );

        const strategy: NgxComponentOutletAdapterBuilderStrategy =
            this.adapterBuilderStrategyResolver.resolve(componentType);

        return strategy.create(componentFactory, componentRef, viewContainerRef, context);
    }

}
