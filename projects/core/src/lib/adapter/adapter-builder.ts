import {
    ChangeDetectorRef,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef, ElementRef,
    Injectable,
    Injector,
    NgModuleRef,
    Type,
    ViewContainerRef, ViewRef
} from '@angular/core';
import { NgxComponentOutletAdapterRef } from './adapter-ref';
import { resolveStrategy, StrategyConfig, createFeatureComponents } from './lifecycle-strategies';


/**
 * @deprecated
 */
@Injectable()
export class NgxComponentOutletAdapterBuilder {

    create<TComponent>(
        componentType: Type<TComponent>,
        viewContainerRef: ViewContainerRef,
        injector: Injector,
        projectableNodes: any[][],
        host: TComponent,
        componentFactoryResolver: ComponentFactoryResolver
    ): NgxComponentOutletAdapterRef<TComponent> {
        const componentFactory: ComponentFactory<TComponent> =
            componentFactoryResolver.resolveComponentFactory(componentType);

        const componentRef: ComponentRef<TComponent> =
            viewContainerRef.createComponent(
                componentFactory, viewContainerRef.length, injector,
                projectableNodes
            );

        const config = resolveStrategy(componentType);
        return this.createAdapterRef(componentFactory, componentRef, viewContainerRef, host, config, componentFactoryResolver);
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
