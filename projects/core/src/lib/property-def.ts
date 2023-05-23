export type Disposable = () => void;

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

/**
 * PropertyDef is a structure that describes a property of a component.
 *
 * insidePropName is the name of the property inside the component, e.g. `value` in `@Input() value: string;`
 * outsidePropName is the name of the property outside the component, e.g. `value` in `<my-component [value]="value"></my-component>`
 */
export interface PropertyDef<T> {
  context: T;
  dynamicContext: T;
  hostContext: T;
  insidePropName: string;
  outsidePropName: string;
}

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

export interface BindingDef<T> extends PropertyDef<T> {
  defaultDescriptor: PropertyDescriptor;
}
