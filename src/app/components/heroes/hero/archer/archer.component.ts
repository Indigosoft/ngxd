import { Component, Input } from '@angular/core';
import { Archer } from '@app/domain/heroes';

import { HeroComponentBase } from '../hero.component.interface';

@Component({
    selector: 'app-archer-hero',
    templateUrl: 'archer.component.html'
})
export class ArcherHeroComponent implements HeroComponentBase {

    @Input() hero: Archer;

}
