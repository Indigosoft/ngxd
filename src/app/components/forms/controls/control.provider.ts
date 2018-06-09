import { InjectionToken, Provider, Type } from '@angular/core';
import { FormControlSchema } from '@ngxd/forms';

export interface FormControlProvider {
    type: Type<FormControlSchema>;
    component: Type<any>;
}

export const FORM_CONTROL_PROVIDER = new InjectionToken<FormControlProvider[]>('Form Control Provider');

export function provideControl(type: Type<FormControlSchema>, component: Type<any>): Provider {
    return {
        provide: FORM_CONTROL_PROVIDER,
        useValue: { type, component }, multi: true
    };
}
