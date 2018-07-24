import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { EntityComponentResolver } from './dynamic-entity.resolver';
import { DynamicEntityObject } from './DynamicEntityObject';

@Component({
    selector: 'app-dynamic-entity',
    templateUrl: 'dynamic-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEntityComponent {

    @Input() entity: DynamicEntityObject;
    @Output() action: EventEmitter<string> = new EventEmitter<string>();

    constructor(public resolver: EntityComponentResolver) {}

    ngOnChanges(changes) {
        console.log(changes);
    }

}
