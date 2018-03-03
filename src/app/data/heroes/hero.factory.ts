import { Type } from '@angular/core';
import { HeroBase, HeroTypes, UnknownHero } from '@app/domain/heroes';

import { HeroProvider } from './hero.module';

import { Map } from 'immutable';

export class HeroFactory {

    private heroes: Map<HeroTypes, Type<HeroBase>>;

    constructor(heroes: HeroProvider[]) {
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
