import { Component, Input } from '@angular/core';
import { HeroBase } from '@app/domain/heroes';

@Component({
    selector: 'app-heroes',
    template: `<app-hero *ngFor="let hero of heroes" [hero]="hero"></app-hero>`
})
export class HeroesComponent {

    @Input() heroes: HeroBase[];

}
