import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Hero } from './Hero';

@Component({
    selector: 'app-hero-entity',
    templateUrl: 'hero.component.html',
    styleUrls: [ 'hero.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroEntityComponent {

    @Input('entity') hero: Hero;

    trackById(index, { id }): string {
        return id;
    }

}
