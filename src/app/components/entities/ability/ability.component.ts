import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Output() action: EventEmitter<any> = new EventEmitter<any>();

    ngOnChanges(changes) {
        console.log(changes);
    }

}

export const COMPONENT = AbilityEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Ability, AbilityEntityComponent);
