import {
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';

export const PRIVATE_PREFIX = '__ngxOnChanges_';

export type Disposable = Function;

export function hasOnChangesHook(component: unknown): component is OnChanges {
  return component && hasProperty(component, 'ngOnChanges');
}

export function hasDoCheckHook(component: unknown): component is DoCheck {
  return component && hasProperty(component, 'ngDoCheck');
}

export function hasOnInitHook(component: unknown): component is OnInit {
  return component && hasProperty(component, 'ngOnInit');
}

export function createComponentRef<T>(
  componentType: Type<T>,
  viewContainerRef: ViewContainerRef,
  componentFactoryResolver: ComponentFactoryResolver
): ComponentRef<T> {
  const componentFactory = componentFactoryResolver.resolveComponentFactory(componentType);
  return viewContainerRef.createComponent(componentFactory, viewContainerRef.length);
}

export function runOnChangesHook(context: unknown): void {
  const simpleChanges = context[PRIVATE_PREFIX];

  if (simpleChanges != null && hasOnChangesHook(context)) {
    context.ngOnChanges(simpleChanges);
  }
  context[PRIVATE_PREFIX] = null;
}

export function hasProperty(context: any, name: string): boolean {
  if (name in context) {
    return true;
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return hasProperty(prototype, name);
  }

  return false;
}

export function getPropertyDescriptor(context: any, name: string): PropertyDescriptor {
  const descriptor = Object.getOwnPropertyDescriptor(context, name);

  if (descriptor) {
    return Object.getOwnPropertyDescriptor(context, name);
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return getPropertyDescriptor(prototype, name);
  }

  return void 0;
}

export function deletePropertyDescriptor(context: any, name: string) {
  const descriptor = Object.getOwnPropertyDescriptor(context, name);

  if (descriptor) {
    delete context[name];
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return deletePropertyDescriptor(prototype, name);
  }
}

export interface PropertyDef<T> {
  context: T;
  dynamicContext: T;
  hostContext: T;
  insidePropName: string;
  outsidePropName: string;
}

// {propName: "insidePropName", templateName: "outsidePropName"}
export function toPropertyDef<T>(
  context: T,
  dynamicContext: T,
  hostContext: T
): (property: { propName: string; templateName: string }) => PropertyDef<T> {
  return (property: { propName: string; templateName: string }) => ({
    context: context,
    dynamicContext: dynamicContext,
    hostContext: hostContext,
    insidePropName: property.propName,
    outsidePropName: property.templateName,
  });
}

export const PRIVATE_CONTEXT_PREFIX = '__ngxContext__';

export interface BindingDef<T> extends PropertyDef<T> {
  defaultDescriptor: PropertyDescriptor;
}
