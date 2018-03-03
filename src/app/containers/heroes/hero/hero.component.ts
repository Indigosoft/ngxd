import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroDataService } from '@app/data/heroes';
import { HeroBase } from '@app/domain/heroes';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-hero-page',
    templateUrl: 'hero.component.html'
})
export class HeroPageComponent {

    id$: Observable<number> =
        this.route.params.map((params) => Number(params.id));

    hero$: Observable<HeroBase> =
        this.id$.switchMap((id) => this.service.getHero(id));

    constructor(private route: ActivatedRoute, private service: HeroDataService) {}

}
