import { InjectionToken, Provider, Type } from '@angular/core';

import { EntityObject } from './EntityObject';

export interface EntityProvider {
    type: Type<EntityObject>;
    component: Type<any>;
}

export const ENTITY_PROVIDER = new InjectionToken<EntityProvider[]>('Entity Provider');

export function provideEntity(type: Type<EntityObject>, component: Type<any>): Provider {
    return {
        provide: ENTITY_PROVIDER,
        useValue: { type, component }, multi: true
    };
}
