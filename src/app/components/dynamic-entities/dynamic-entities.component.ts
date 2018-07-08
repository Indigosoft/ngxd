import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicEntityObject } from './dynamic-entity';

@Component({
    selector: 'app-dynamic-entities',
    templateUrl: 'dynamic-entities.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEntitiesComponent {

    @Input() entities: DynamicEntityObject[];

    trackById(index, entity: DynamicEntityObject): string {
        return entity.id;
    }

}
