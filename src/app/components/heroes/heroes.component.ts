import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroBase } from '@app/domain/heroes';

@Component({
    selector: 'app-heroes',
    templateUrl: 'heroes.component.html'
})
export class HeroesComponent {

    @Input() heroes: HeroBase[];

    trackByIndex(index: number) {
        return index;
    }

}
