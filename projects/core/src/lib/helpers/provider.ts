import { InjectionToken, Type, ValueProvider } from '@angular/core';

export abstract class NgxdProvider<TType, TComponent> {
    type: TType | Type<TType>;
    component: TComponent;
}

export type DynamicFn<TType, TComponent> = (provider: NgxdProvider<TType, TComponent>) => ValueProvider;

export function Dynamic<TType, TComponent>({ token }: { token?: InjectionToken<NgxdProvider<TType, TComponent>> } = {}): DynamicFn<TType, TComponent> {
    return function(provider: NgxdProvider<TType, TComponent>): ValueProvider {
        return { provide: token, useValue: provider, multi: true };
    };
}
