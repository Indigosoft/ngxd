import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { hasProperty } from '../utils';
import {
  DoCheckOnlyComponent,
  OnInitAndDoCheckComponent,
  OnInitOnlyComponent,
} from './lifecycle.components';

export enum LifecycleStrategyType {
  Default,
  OnInitOnly,
  DoCheckOnly,
  OnInitAndDoCheck,
}

export type LifecycleComponent = OnInit & DoCheck | OnInit | DoCheck | any;

export interface StrategyConfig {
  componentType?: Type<LifecycleComponent>;
  useOnInitComponent?: boolean;
  useDoCheckComponent?: boolean;
}

export interface LifecycleComponents {
  onInitComponentRef: ComponentRef<LifecycleComponent>;
  doCheckComponentRef: ComponentRef<LifecycleComponent>;
}

const STRATEGY_CONFIG: { [key: number]: StrategyConfig } = {
  [LifecycleStrategyType.Default]: {},
  [LifecycleStrategyType.OnInitOnly]: {
    componentType: OnInitOnlyComponent,
    useOnInitComponent: true,
  },
  [LifecycleStrategyType.DoCheckOnly]: {
    componentType: DoCheckOnlyComponent,
    useDoCheckComponent: true,
  },
  [LifecycleStrategyType.OnInitAndDoCheck]: {
    componentType: OnInitAndDoCheckComponent,
    useOnInitComponent: true,
    useDoCheckComponent: true,
  },
};

const FEATURE_COMPONENTS_DISABLE = {
  onInitComponentRef: null,
  doCheckComponentRef: null,
};

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

function createLifecycleComponents(
  viewContainerRef: ViewContainerRef,
  config: StrategyConfig,
  componentFactoryResolver: ComponentFactoryResolver
): LifecycleComponents {
  if (!config.componentType) {
    return FEATURE_COMPONENTS_DISABLE;
  }

  const lifecycleComponentFactory: ComponentFactory<
    LifecycleComponent
  > = componentFactoryResolver.resolveComponentFactory(config.componentType);

  const lifecycleComponentRef: ComponentRef<LifecycleComponent> = viewContainerRef.createComponent(
    lifecycleComponentFactory,
    viewContainerRef.length
  );

  return {
    onInitComponentRef: config.useOnInitComponent ? lifecycleComponentRef : null,
    doCheckComponentRef: config.useDoCheckComponent ? lifecycleComponentRef : null,
  };
}

export function resolveLifecycleComponents<TComponent>(
  componentType: Type<TComponent>,
  viewContainerRef: ViewContainerRef,
  componentFactoryResolver: ComponentFactoryResolver
): LifecycleComponents {
  const strategyConfig: StrategyConfig = resolveStrategy(componentType);
  return createLifecycleComponents(viewContainerRef, strategyConfig, componentFactoryResolver);
}
