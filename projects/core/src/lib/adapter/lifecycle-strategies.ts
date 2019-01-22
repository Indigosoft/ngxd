import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { hasProperty } from '../utils';
import { DoCheckOnlyComponent, OnInitAndDoCheckComponent, OnInitOnlyComponent } from './adapter-components';
import { LifecycleComponent } from './adapter-ref';

export enum LifecycleStrategyType {
    Default,
    OnInitOnly,
    DoCheckOnly,
    OnInitAndDoCheck
}

export interface StrategyConfig {
    componentType?: Type<LifecycleComponent>;
    useOnInitComponent?: boolean;
    useDoCheckComponent?: boolean;
}

export interface FeatureComponents {
    onInitComponentRef: ComponentRef<LifecycleComponent>;
    doCheckComponentRef: ComponentRef<LifecycleComponent>;
}

const STRATEGY_CONFIG: { [ key: number ]: StrategyConfig } = {
    [ LifecycleStrategyType.Default ]: {},
    [ LifecycleStrategyType.OnInitOnly ]: {
        componentType: OnInitOnlyComponent,
        useOnInitComponent: true
    },
    [ LifecycleStrategyType.DoCheckOnly ]: {
        componentType: DoCheckOnlyComponent,
        useDoCheckComponent: true
    },
    [ LifecycleStrategyType.OnInitAndDoCheck ]: {
        componentType: OnInitAndDoCheckComponent,
        useOnInitComponent: true,
        useDoCheckComponent: true
    }
};

const FEATURE_COMPONENTS_DISABLE = { onInitComponentRef: null, doCheckComponentRef: null };

export function resolveStrategy(component: Type<any>) {
    const type = resolveStrategyType(component);
    return STRATEGY_CONFIG[type];
}

function resolveStrategyType<T = any>(component: Type<T>): LifecycleStrategyType {
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

export function createFeatureComponents(
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
