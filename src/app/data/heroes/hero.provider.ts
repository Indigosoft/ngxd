import { InjectionToken, Type } from '@angular/core';
import { HeroBase, HeroTypes } from '@app/domain/heroes';

export type HeroProvider = [ HeroTypes, Type<HeroBase> ];

export const HEROES_PROVIDER: InjectionToken<HeroProvider[]> =
    new InjectionToken<HeroProvider[]>('Heroes Provider');
