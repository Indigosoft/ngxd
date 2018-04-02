import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { List } from 'immutable';

import { EntityObject } from '@app/components/entities';

@Component({
    selector: 'app-dynamics',
    templateUrl: 'dynamics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicsComponent {

    @Input() entities: EntityObject[];

    get cols(): number {
        if (!this.entities) {
            return 0;
        }

        return Math.min(3, this.entities.length);
    }

    trackById(index, entity: EntityObject): string {
        return entity.id;
    }

}

