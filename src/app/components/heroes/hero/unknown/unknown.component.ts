import { Component, Input } from '@angular/core';
import { HeroBase } from '@app/domain/heroes';

import { HeroComponentBase } from '../hero.component.interface';

@Component({
    selector: 'app-unknown-hero',
    templateUrl: 'unknown.component.html'
})
export class UnknownHeroComponent implements HeroComponentBase {

    @Input() hero: HeroBase;

}
