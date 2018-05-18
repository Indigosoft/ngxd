import { InjectionToken, Provider, Type } from '@angular/core';
import { ControlBase } from './ControlBase';

export interface ControlProvider {
    type: Type<ControlBase>;
    component: Type<any>;
}

export const CONTROL_PROVIDER = new InjectionToken<ControlProvider[]>('Control Provider');

export function provideControl(type: Type<ControlBase>, component: Type<any>): Provider {
    return {
        provide: CONTROL_PROVIDER,
        useValue: { type, component }, multi: true
    };
}
