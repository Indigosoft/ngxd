import { Inject, Optional, Type } from '@angular/core';
import { HeroBase, HeroTypes, UnknownHero } from '@app/domain/heroes';

import { HEROES_PROVIDER, HeroProvider } from './hero.module';

import { Map } from 'immutable';

export class HeroFactory {

    private heroes: Map<HeroTypes, Type<HeroBase>>;

    constructor(@Optional() @Inject(HEROES_PROVIDER) heroes: HeroProvider[]) {
        this.heroes = Map<HeroTypes, Type<HeroBase>>(heroes);
    }

    make<THero extends HeroBase>(type: HeroTypes, hero: THero): THero {
        const factory: Type<THero> = this.factoryResolve(type);

        return new factory(hero);
    }

    private factoryResolve<THero extends HeroBase>(type: HeroTypes): Type<THero> {
        return this.heroes.get(type, UnknownHero) as Type<THero>;
    }

}
