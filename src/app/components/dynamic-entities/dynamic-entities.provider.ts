import { InjectionToken } from '@angular/core';
import { DynamicEntityObject } from './dynamic-entity';

export const ENTITIES_DATA_PROVIDER = new InjectionToken<DynamicEntityObject[]>('Entities Data Provider');
