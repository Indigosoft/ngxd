import { ENTITY_PROVIDER, EntityProvider } from '@app/components/entities/entity.provider';

import { Hero } from './Hero';
import { HeroEntityComponent } from './hero.component';

const entityProvider: EntityProvider = { entityType: Hero, componentType: HeroEntityComponent };

export const HERO_PROVIDERS = [ { provide: ENTITY_PROVIDER, useValue: entityProvider, multi: true } ];
export const HERO_COMPONENTS = [ HeroEntityComponent ];
