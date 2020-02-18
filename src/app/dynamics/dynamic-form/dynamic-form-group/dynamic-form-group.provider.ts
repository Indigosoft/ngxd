import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Provider, Type } from '@angular/core';
import { DynamicFormGroupComponentBase } from './dynamic-form-group.base';
import { NgxdProvider } from '@ngxd/core';
import { FormGroupSchema } from '@ngxd/forms';

export type FormGroupProvider = NgxdProvider<
  Type<FormGroupSchema>,
  Type<DynamicFormGroupComponentBase>
>;

export const FORM_GROUP_PROVIDER = new InjectionToken<FormGroupProvider[]>('Form Group Provider');

export function provideFormGroup(
  type: Type<FormGroupSchema>,
  component: Type<DynamicFormGroupComponentBase>
): Provider {
  return [
    { provide: FORM_GROUP_PROVIDER, useValue: { type, component }, multi: true },
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
  ];
}
