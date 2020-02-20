import {
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { createComponentRef, Disposable, hasOnChangesHook, hasProperty } from '../utils';
import {
  DoCheckOnlyComponent,
  isLifecycleComponent,
  OnInitAndDoCheckComponent,
  OnInitOnlyComponent,
} from './lifecycle.components';

enum LifecycleStrategyType {
  Default,
  OnInitOnly,
  DoCheckOnly,
  OnInitAndDoCheck,
}

type LifecycleComponent = OnInit & DoCheck | OnInit | DoCheck | any;

interface StrategyConfig {
  componentType?: Type<LifecycleComponent>;
  useOnInitComponent?: boolean;
  useDoCheckComponent?: boolean;
}

interface LifecycleComponents {
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

function resolveLifecycleStrategy(component: Type<any>) {
  const hasNgOnInit: boolean = hasProperty(component.prototype, 'ngOnInit');
  const hasNgDoCheck: boolean = hasProperty(component.prototype, 'ngDoCheck');
  const hasNgOnChanges: boolean = hasProperty(component.prototype, 'ngOnChanges');

  let type;
  if (hasNgOnChanges && !hasNgOnInit && !hasNgDoCheck) {
    type = LifecycleStrategyType.OnInitAndDoCheck;
  } else if (hasNgOnChanges && !hasNgOnInit) {
    type = LifecycleStrategyType.OnInitOnly;
  } else if (!hasNgDoCheck) {
    type = LifecycleStrategyType.DoCheckOnly;
  } else {
    type = LifecycleStrategyType.Default;
  }

  const USE_ONLY_INIT_AND_DO_CHECK_STRATEGY_FOR_IVY = LifecycleStrategyType.OnInitAndDoCheck;
  return STRATEGY_CONFIG[USE_ONLY_INIT_AND_DO_CHECK_STRATEGY_FOR_IVY];
}

function createLifecycleComponents(
  componentType: Type<LifecycleComponent>,
  viewContainerRef: ViewContainerRef,
  componentFactoryResolver: ComponentFactoryResolver
): LifecycleComponents {
  const config: StrategyConfig = resolveLifecycleStrategy(componentType);

  if (!config.componentType) {
    return FEATURE_COMPONENTS_DISABLE;
  }

  const lifecycleComponentRef = createComponentRef(
    config.componentType,
    viewContainerRef,
    componentFactoryResolver
  );

  return {
    onInitComponentRef: config.useOnInitComponent ? lifecycleComponentRef : null,
    doCheckComponentRef: config.useDoCheckComponent ? lifecycleComponentRef : null,
  };
}

export function attachLifecycle<TComponent>(
  componentRef: ComponentRef<TComponent>,
  viewContainerRef: ViewContainerRef,
  componentFactoryResolver: ComponentFactoryResolver
): Disposable {
  const component = componentRef.instance;
  const componentType: Type<TComponent> = component.constructor as Type<TComponent>;

  let components = createLifecycleComponents(
    componentType,
    viewContainerRef,
    componentFactoryResolver
  );
  components = {
    onInitComponentRef: components.onInitComponentRef || componentRef,
    doCheckComponentRef: components.doCheckComponentRef || componentRef,
  };

  if (hasOnChangesHook(component)) {
    if (isLifecycleComponent(components.onInitComponentRef.instance)) {
      components.onInitComponentRef.instance.attach(component, componentRef.changeDetectorRef);
    } else {
      console.warn('todo: add for OnInit on dynamic component');
    }

    if (isLifecycleComponent(components.doCheckComponentRef.instance)) {
      components.doCheckComponentRef.instance.attach(component, componentRef.changeDetectorRef);
    } else {
      console.warn('todo: add for DoCheck on dynamic component');
    }
  } else {
    if (isLifecycleComponent(components.doCheckComponentRef.instance)) {
      components.doCheckComponentRef.instance.attach(component, componentRef.changeDetectorRef);
    } else {
      console.warn('todo: add for DoCheck on dynamic component');
    }
  }

  return () => {
    if (isLifecycleComponent(components.doCheckComponentRef.instance)) {
      components.doCheckComponentRef.destroy();
    }

    if (isLifecycleComponent(components.onInitComponentRef.instance)) {
      components.onInitComponentRef.destroy();
    }
  };
}
