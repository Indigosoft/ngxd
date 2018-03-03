import { Component } from '@angular/core';
import { HeroDataService } from '@app/data/heroes';
import { HeroBase } from '@app/domain/heroes';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-heroes-page',
    templateUrl: 'heroes.component.html'
})
export class HeroesPageComponent {

    heroes$: Observable<List<HeroBase>> = this.service.getHeroes();

    constructor(private service: HeroDataService) {}

}
