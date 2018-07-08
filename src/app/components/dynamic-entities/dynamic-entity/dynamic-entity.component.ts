import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { EntityComponentResolver } from './dynamic-entity.resolver';
import { DynamicEntityObject } from './DynamicEntityObject';

@Component({
    selector: 'app-dynamic-entity-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicHostComponent {

    @Input() entity: DynamicEntityObject;

}

@Component({
    selector: 'app-dynamic-entity',
    templateUrl: 'dynamic-entity.component.html',
    styleUrls: [ 'dynamic-entity.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEntityComponent {

    @Input() entity: DynamicEntityObject;

    constructor(public resolver: EntityComponentResolver) {}

}
