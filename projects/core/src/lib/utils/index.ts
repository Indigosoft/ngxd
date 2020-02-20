import { OnChanges, SimpleChanges } from '@angular/core';

export const PRIVATE_PREFIX = '__ngxOnChanges_';

export type OnChangesExpando = OnChanges & {
  __ngOnChanges_: SimpleChanges | null | undefined;
  [key: string]: any;
};

export function onChangesWrapper(delegateHook: (() => void) | null) {
  return function(this: OnChangesExpando) {
    const simpleChanges = this[PRIVATE_PREFIX];

    if (simpleChanges != null) {
      if (this.ngOnChanges) {
        this.ngOnChanges(simpleChanges);
      }
      this[PRIVATE_PREFIX] = null;
    }

    if (delegateHook) {
      delegateHook.apply(this);
    }
  };
}

export function markForCheckWrapper(delegateHook: (() => void) | null, cd) {
  return function(this) {
    if (delegateHook) {
      delegateHook.apply(this);
    }

    if (cd) {
      cd.markForCheck();
    }
  };
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
