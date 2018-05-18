import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { hasProperty } from '../utils';
import { DoCheckOnlyComponent, OnInitAndDoCheckComponent, OnInitOnlyComponent } from './adapter-components';
import { LifecycleComponent, NgxComponentOutletAdapterRef, NgxComponentOutletAdapterRefConfig } from './adapter-ref';

enum LifecycleStrategyType {
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

interface FeatureComponents {
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

export class NgxComponentOutletAdapterBuilderStrategy {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private config: StrategyConfig
    ) {}

    create<TComponent>(
        componentFactory: ComponentFactory<TComponent>,
        componentRef: ComponentRef<TComponent>,
        viewContainerRef: ViewContainerRef,
        context: TComponent
    ): NgxComponentOutletAdapterRef<TComponent> {
        const { onInitComponentRef, doCheckComponentRef } = this.createFeatureComponents(viewContainerRef);

        return this.createAdapterRef({
            componentFactory, componentRef, context,
            onInitComponentRef, doCheckComponentRef
        });
    }

    private createFeatureComponents(viewContainerRef: ViewContainerRef): FeatureComponents {
        if (!this.config.componentType) {
            return { onInitComponentRef: null, doCheckComponentRef: null };
        }

        const featureComponentFactory: ComponentFactory<LifecycleComponent> =
            this.componentFactoryResolver.resolveComponentFactory(this.config.componentType);

        const featureComponentRef: ComponentRef<LifecycleComponent> =
            viewContainerRef.createComponent(featureComponentFactory, viewContainerRef.length);

        return {
            onInitComponentRef: this.config.useOnInitComponent ? featureComponentRef : null,
            doCheckComponentRef: this.config.useDoCheckComponent ? featureComponentRef : null
        };
    }

    private createAdapterRef<TComponent>(config: NgxComponentOutletAdapterRefConfig<TComponent>): NgxComponentOutletAdapterRef<TComponent> {
        return new NgxComponentOutletAdapterRef(config);
    }
}

@Injectable()
export class NgxComponentOutletAdapterBuilderStrategyResolver {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    resolve(component: Type<any>): NgxComponentOutletAdapterBuilderStrategy {
        const type: LifecycleStrategyType = this.getStrategyType(component);

        return new NgxComponentOutletAdapterBuilderStrategy(this.componentFactoryResolver, STRATEGY_CONFIG[ type ]);
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
