import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Type, ValueProvider } from '@angular/core';
import { FormArraySchema } from '@ngxd/forms';

export interface FormArrayProvider {
    type: Type<FormArraySchema>;
    component: Type<any>;
}

export const FORM_ARRAY_PROVIDER = new InjectionToken<FormArrayProvider[]>('Form Array Provider');

export function provideFormArray(type: Type<FormArraySchema>, component: Type<any>): ValueProvider[] {
    return [
        { provide: FORM_ARRAY_PROVIDER, useValue: { type, component }, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true }
    ];
}
