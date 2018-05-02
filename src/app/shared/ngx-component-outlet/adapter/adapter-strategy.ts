import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import {
    NgxComponentOutletDoCheckOnly, NgxComponentOutletOnInitAndDoCheck, NgxComponentOutletOnInitOnly
} from 'adapter-components';
import { LifeCycleComponent, NgxComponentOutletAdapterRef, NgxComponentOutletAdapterRefConfig } from './adapter-ref';

enum LifeCycleHookStrategyType {
    Default,
    OnInitOnly,
    DoCheckOnly,
    OnInitAndDoCheck
}

export interface StrategyConfig {
    componentType?: Type<LifeCycleComponent>;
    useOnInitComponent?: boolean;
    useDoCheckComponent?: boolean;
}

const STRATEGY_CONFIG: { [ key: number ]: StrategyConfig } = {
    [ LifeCycleHookStrategyType.Default ]: {},
    [ LifeCycleHookStrategyType.OnInitOnly ]: {
        componentType: NgxComponentOutletOnInitOnly,
        useOnInitComponent: true
    },
    [ LifeCycleHookStrategyType.DoCheckOnly ]: {
        componentType: NgxComponentOutletDoCheckOnly,
        useDoCheckComponent: true
    },
    [ LifeCycleHookStrategyType.OnInitAndDoCheck ]: {
        componentType: NgxComponentOutletOnInitAndDoCheck,
        useOnInitComponent: true,
        useDoCheckComponent: true
    }
};

export class NgxComponentOutletAdapterBuilderStrategy {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private config: StrategyConfig
    ) {
    }

    create<TComponent>(
        componentFactory: ComponentFactory<TComponent>,
        componentRef: ComponentRef<TComponent>,
        viewContainerRef: ViewContainerRef,
        context: TComponent
    ): NgxComponentOutletAdapterRef<TComponent> {
        const { onInitComponentRef, doCheckComponentRef } = this.createFeatureComponent(viewContainerRef);

        return this.createAdapterRef({
            componentFactory, componentRef, context,
            onInitComponentRef, doCheckComponentRef
        });
    }

    private createFeatureComponent(
        viewContainerRef: ViewContainerRef
    ): { onInitComponentRef: ComponentRef<LifeCycleComponent>, doCheckComponentRef: ComponentRef<LifeCycleComponent> } {
        if (!this.config.componentType) {
            return { onInitComponentRef: null, doCheckComponentRef: null };
        }

        const featureComponentFactory: ComponentFactory<LifeCycleComponent> =
            this.componentFactoryResolver.resolveComponentFactory(this.config.componentType);

        const featureComponentRef: ComponentRef<LifeCycleComponent> =
            viewContainerRef.createComponent(featureComponentFactory, viewContainerRef.length);

        return {
            onInitComponentRef: this.config.useOnInitComponent ? featureComponentRef : null,
            doCheckComponentRef: this.config.useDoCheckComponent ? featureComponentRef : null
        };
    }

    private createAdapterRef<TComponent>(
        config: NgxComponentOutletAdapterRefConfig<TComponent>
    ): NgxComponentOutletAdapterRef<TComponent> {
        return new NgxComponentOutletAdapterRef(config);
    }
}

@Injectable()
export class NgxComponentOutletAdapterBuilderStrategyResolver {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    resolve(component: Type<any>): NgxComponentOutletAdapterBuilderStrategy {
        const type: LifeCycleHookStrategyType = this.getStrategyType(component);

        return new NgxComponentOutletAdapterBuilderStrategy(this.componentFactoryResolver, STRATEGY_CONFIG[ type ]);
    }

    private getStrategyType(component: Type<any>) {
        const hasNgOnInit: boolean = component.prototype.hasOwnProperty('ngOnInit');
        const hasNgDoCheck: boolean = component.prototype.hasOwnProperty('ngDoCheck');
        const hasNgOnChanges: boolean = component.prototype.hasOwnProperty('ngOnChanges');

        if (hasNgOnChanges && !hasNgOnInit && !hasNgDoCheck) {
            return LifeCycleHookStrategyType.OnInitAndDoCheck;
        }

        if (hasNgOnChanges && !hasNgOnInit) {
            return LifeCycleHookStrategyType.OnInitOnly;
        }

        if (!hasNgDoCheck) {
            return LifeCycleHookStrategyType.DoCheckOnly;
        }

        return LifeCycleHookStrategyType.Default;
    }

}
