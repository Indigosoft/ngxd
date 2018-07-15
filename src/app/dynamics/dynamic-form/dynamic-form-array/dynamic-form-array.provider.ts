import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Provider, Type } from '@angular/core';
import { FormArraySchema } from '@ngxd/forms';

export interface FormArrayProvider {
    type: Type<FormArraySchema>;
    component: Type<any>;
}

export const FORM_ARRAY_PROVIDER = new InjectionToken<FormArrayProvider[]>('Form Array Provider');

export function provideFormArray(type: Type<FormArraySchema>, component: Type<any>): Provider {
    return [
        { provide: FORM_ARRAY_PROVIDER, useValue: { type, component }, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true }
    ];
}
