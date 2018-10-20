import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicEntityComponentBase, DynamicEntityModule } from '@app/dynamics';

import { Ability } from './Ability';

@Component({
    selector: 'app-ability-entity',
    templateUrl: 'ability.component.html',
    styleUrls: [ 'ability.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilityEntityComponent extends DynamicEntityComponentBase {

    @Input() entity: Ability;

}

export const COMPONENT = AbilityEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Ability, AbilityEntityComponent);
