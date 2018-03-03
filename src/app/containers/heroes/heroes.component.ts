import { Component } from '@angular/core';
import { HeroDataService } from '@app/data/heroes';
import { HeroBase, HeroTypes } from '@app/domain/heroes';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';

@Component({
    selector: 'app-heroes-page',
    templateUrl: 'heroes.component.html'
})
export class HeroesPageComponent {

    heroes$: Observable<List<HeroBase>> = this.service.getHeroes();

    get randomType(): HeroTypes {
        return Object.keys(HeroTypes)[ Math.floor(Math.random() * Object.keys(HeroTypes).length) ] as HeroTypes;
    }

    get randomHero(): HeroBase {
        let heroes: List<HeroBase>;

        this.heroes$.take(1).subscribe((_) => heroes = _);

        return heroes.get(Math.floor(Math.random() * heroes.count()));
    }

    constructor(private service: HeroDataService) {}

    createHero() {
        const type: HeroTypes = this.randomType;

        this.service.createHero({ name: type.toString(), type: type });
    }

    changeNameHero() {
        const id: number = 1;

        this.service.getHero(id).take(1).subscribe((hero: HeroBase) => {
            const type: HeroTypes = this.randomType;

            this.service.updateHero(id, { ...hero, name: type.toString() });
        });
    }

    changeTypeHero() {
        const id: number = 1;

        this.service.getHero(id).take(1).subscribe((hero: HeroBase) => {
            const type: HeroTypes = this.randomType;

            this.service.updateHero(id, { ...hero, type: type });
        });
    }

}
