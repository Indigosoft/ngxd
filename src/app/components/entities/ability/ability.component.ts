import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { provideEntity } from '../entity.provider';

import { Ability } from './Ability';

@Component({
    selector: 'app-ability-entity',
    templateUrl: 'ability.component.html',
    styleUrls: [ 'ability.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilityEntityComponent {

    @Input('entity') ability: Ability;

}

export const PROVIDERS = provideEntity(Ability, AbilityEntityComponent);
export const COMPONENTS = [ AbilityEntityComponent ];
