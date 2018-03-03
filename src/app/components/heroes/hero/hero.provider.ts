import { InjectionToken, Type } from '@angular/core';
import { HeroTypes } from '@app/domain/heroes';

import { HeroComponentBase } from './hero.component.interface';

export type HeroComponentProvider = [ HeroTypes, Type<HeroComponentBase>[] ];

export const HERO_COMPONENTS_PROVIDER: InjectionToken<HeroComponentProvider> =
    new InjectionToken<HeroComponentProvider>('Hero Components');

export const UNKNOWN_HERO_COMPONENT_PROVIDER: InjectionToken<Type<HeroComponentBase>[]> =
    new InjectionToken<Type<HeroComponentBase>[]>('Unknown Hero Component');
