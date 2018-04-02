import { InjectionToken, Type } from '@angular/core';

import { EntityObject } from './EntityObject';

export interface EntityProvider {
    entityType: Type<EntityObject>;
    componentType: Type<any>;
}

export const ENTITY_PROVIDER = new InjectionToken<EntityProvider[]>('Entity Provider');
