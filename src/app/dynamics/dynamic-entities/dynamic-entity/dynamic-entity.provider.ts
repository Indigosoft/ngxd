import { InjectionToken, Type } from '@angular/core';

import { DynamicEntityObject } from './DynamicEntityObject';

export interface DynamicEntityProvider {
    type: Type<DynamicEntityObject>;
    component: Type<any>;
}

export const ENTITY_PROVIDER = new InjectionToken<DynamicEntityProvider[]>('Entity Provider');
