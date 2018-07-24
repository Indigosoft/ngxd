import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicEntityModule } from '@app/dynamics/dynamic-entities';

import { Hero } from './Hero';

@Component({
    selector: 'app-hero-entity',
    templateUrl: 'hero.component.html',
    styleUrls: [ 'hero.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroEntityComponent {

    @Input() name: string;
    @Input() forInput: string;
    @Input('entity') hero: Hero;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();

    trackById(index, { id }): string {
        return id;
    }

    // ngOnChanges(changes) {
    //     console.log(changes);
    // }

}

export const COMPONENT = HeroEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Hero, HeroEntityComponent);
