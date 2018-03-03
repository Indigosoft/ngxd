import { Injectable } from '@angular/core';
import { HeroBase } from '@app/domain/heroes';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { HeroFactory } from './hero.factory';
import { HEROES } from './heroes';

@Injectable()
export class HeroDataService {

    constructor(private factory: HeroFactory) {}

    getHeroes(): Observable<List<HeroBase>> {
        const heroes: List<HeroBase> =
            List<HeroBase>(HEROES).map((hero: HeroBase) =>
                this.factory.make(hero.type, hero)).toList();

        return Observable.of(heroes);
    }

    getHero(id: number): Observable<HeroBase> {
        return this.getHeroes().map((heroes) => heroes.get(id));
    }

}
