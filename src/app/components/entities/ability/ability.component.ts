import { Component, Input } from '@angular/core';

import { Ability } from './Ability';

@Component({
    selector: 'app-ability-entity',
    templateUrl: 'ability.component.html',
    styleUrls: [ 'ability.component.scss' ]
})
export class AbilityEntityComponent {

    @Input('entity') ability: Ability;

}
