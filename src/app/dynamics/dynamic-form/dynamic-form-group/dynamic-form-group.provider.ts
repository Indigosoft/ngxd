import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Provider, Type } from '@angular/core';
import { FormGroupSchema } from '@ngxd/forms';

export interface FormGroupProvider {
    type: Type<FormGroupSchema>;
    component: Type<any>;
}

export const FORM_GROUP_PROVIDER = new InjectionToken<FormGroupProvider[]>('Form Group Provider');

export function provideFormGroup(type: Type<FormGroupSchema>, component: Type<any>): Provider {
    return [
        { provide: FORM_GROUP_PROVIDER, useValue: { type, component }, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true }
    ];
}
