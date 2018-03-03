import { Injectable } from '@angular/core';
import { HeroBase } from '@app/domain/heroes';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { HeroFactory } from './hero.factory';
import { HEROES } from './heroes';

@Injectable()
export class HeroDataService {

    heroes$: BehaviorSubject<List<HeroBase>> =
        new BehaviorSubject<List<HeroBase>>(
            List<HeroBase>(HEROES).map((hero: HeroBase) =>
                this.factory.make(hero.type, hero)).toList()
        );

    constructor(private factory: HeroFactory) {}

    getHeroes(): Observable<List<HeroBase>> {
        return this.heroes$.asObservable();
    }

    getHero(id: number): Observable<HeroBase> {
        return this.getHeroes().map((heroes) => heroes.get(id));
    }

    createHero(hero: HeroBase) {
        const heroes: List<HeroBase> =
            this.heroes$.getValue()
                .push(this.factory.make(hero.type, hero));

        this.heroes$.next(heroes);
    }

    updateHero(id: number, hero: HeroBase) {
        const heroes: List<HeroBase> = this.heroes$.getValue();
        const hasHero: boolean = heroes.has(id);

        if (!hasHero) {
            return null;
        }

        this.heroes$.next(heroes.update(id, () => this.factory.make(hero.type, hero)));
    }

}
