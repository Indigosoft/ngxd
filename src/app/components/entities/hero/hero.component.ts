import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicEntityModule } from '../../dynamic-entities';

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

export const COMPONENT = HeroEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Hero, HeroEntityComponent);
