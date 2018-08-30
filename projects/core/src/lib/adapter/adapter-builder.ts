import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { hasProperty } from '../utils';
import { LifecycleComponent, NgxComponentOutletAdapterRef } from './adapter-ref';
import { FeatureComponents, LifecycleStrategyType, STRATEGY_CONFIG, StrategyConfig } from './adapter-strategy';

const FEATURE_COMPONENTS_DISABLE = { onInitComponentRef: null, doCheckComponentRef: null };

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

        const config = STRATEGY_CONFIG[ this.getStrategyType(componentType) ];

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
        const { onInitComponentRef, doCheckComponentRef } = this.createFeatureComponents(
            viewContainerRef,
            config,
            componentFactoryResolver
        );

        return new NgxComponentOutletAdapterRef({
            componentFactory, componentRef, host,
            onInitComponentRef, doCheckComponentRef
        });
    }

    private createFeatureComponents(
        viewContainerRef: ViewContainerRef,
        config: StrategyConfig,
        componentFactoryResolver: ComponentFactoryResolver
    ): FeatureComponents {
        if (!config.componentType) {
            return FEATURE_COMPONENTS_DISABLE;
        }

        const featureComponentFactory: ComponentFactory<LifecycleComponent> =
            componentFactoryResolver.resolveComponentFactory(config.componentType);

        const featureComponentRef: ComponentRef<LifecycleComponent> =
            viewContainerRef.createComponent(featureComponentFactory, viewContainerRef.length);

        return {
            onInitComponentRef: config.useOnInitComponent ? featureComponentRef : null,
            doCheckComponentRef: config.useDoCheckComponent ? featureComponentRef : null
        };
    }

    private getStrategyType(component: Type<any>) {
        const hasNgOnInit: boolean = hasProperty(component.prototype, 'ngOnInit');
        const hasNgDoCheck: boolean = hasProperty(component.prototype, 'ngDoCheck');
        const hasNgOnChanges: boolean = hasProperty(component.prototype, 'ngOnChanges');

        if (hasNgOnChanges && !hasNgOnInit && !hasNgDoCheck) {
            return LifecycleStrategyType.OnInitAndDoCheck;
        }

        if (hasNgOnChanges && !hasNgOnInit) {
            return LifecycleStrategyType.OnInitOnly;
        }

        if (!hasNgDoCheck) {
            return LifecycleStrategyType.DoCheckOnly;
        }

        return LifecycleStrategyType.Default;
    }

}
