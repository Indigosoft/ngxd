import { InjectionToken, Provider, Type } from '@angular/core';

export interface LazyProvider {
    type: string;
    component: Type<any>;
}

export const LAZY_PROVIDER = new InjectionToken<LazyProvider[]>('Lazy Provider');

export function provideLazy(type: string, component: Type<any>): Provider {
    return {
        provide: LAZY_PROVIDER,
        useValue: { type, component }, multi: true
    };
}
