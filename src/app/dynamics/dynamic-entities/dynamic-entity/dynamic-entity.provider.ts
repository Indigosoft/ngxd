import { InjectionToken, Type } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';

import { DynamicEntityComponentBase } from './dynamic-entity.base';
import { DynamicEntityObject } from './DynamicEntityObject';

export type DynamicEntityProvider = NgxdProvider<
  Type<DynamicEntityObject>,
  Type<DynamicEntityComponentBase>
>;

export const ENTITY_PROVIDER = new InjectionToken<DynamicEntityProvider[]>('Entity Provider');
