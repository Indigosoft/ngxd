import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Provider, Type } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';
import { FormControlSchema } from '@ngxd/forms';

import { DynamicFormControlComponentBase } from './dynamic-form-control.base';

export type FormControlProvider = NgxdProvider<
  Type<FormControlSchema>,
  Type<DynamicFormControlComponentBase>
>;

export const FORM_CONTROL_PROVIDER = new InjectionToken<FormControlProvider[]>(
  'Form Control Provider'
);

export function provideControl(
  type: Type<FormControlSchema>,
  component: Type<DynamicFormControlComponentBase>
): Provider {
  return [
    { provide: FORM_CONTROL_PROVIDER, useValue: { type, component }, multi: true },
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
  ];
}
