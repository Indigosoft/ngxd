import { ComponentRef, Type } from '@angular/core';
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

export const STRATEGY_CONFIG: { [ key: number ]: StrategyConfig } = {
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
