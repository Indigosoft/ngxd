import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { EntityObject } from '../entities';

@Component({
    selector: 'app-dynamics',
    templateUrl: 'dynamics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicsComponent {

    @Input() entities: EntityObject[];

    trackById(index, entity: EntityObject): string {
        return entity.id;
    }

}

