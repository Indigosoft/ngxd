import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicEntityModule } from '@app/dynamics/dynamic-entities';

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

export const COMPONENT = AbilityEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Ability, AbilityEntityComponent);
