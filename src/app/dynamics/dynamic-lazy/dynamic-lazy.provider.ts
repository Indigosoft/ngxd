import { InjectionToken, Provider, Type } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';

import { DynamicLazyComponentBase } from './dynamic-lazy.base';

export type LazyProvider = NgxdProvider<string, Type<DynamicLazyComponentBase>>;

export const LAZY_PROVIDER = new InjectionToken<LazyProvider[]>('Lazy Provider');

export function provideLazy(type: string, component: Type<DynamicLazyComponentBase>): Provider {
  return {
    provide: LAZY_PROVIDER,
    useValue: { type, component },
    multi: true,
  };
}
