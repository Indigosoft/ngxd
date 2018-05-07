import { ENTITY_PROVIDER, EntityProvider } from '../entity.provider';

import { Ability } from './Ability';
import { AbilityEntityComponent } from './ability.component';

const entityProvider: EntityProvider = { entityType: Ability, componentType: AbilityEntityComponent };

export const ABILITY_PROVIDERS = [ { provide: ENTITY_PROVIDER, useValue: entityProvider, multi: true } ];
export const ABILITY_COMPONENTS = [ AbilityEntityComponent ];
