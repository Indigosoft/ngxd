import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
import { EntityComponentResolver } from '@app/dynamics/dynamic-entities/dynamic-entity/dynamic-entity.resolver';
import { Observable } from 'rxjs';
import { DynamicEntityObject } from '@app/dynamics/dynamic-entities';
import { EntitiesService } from '@app/components/entities';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-entities-page',
    templateUrl: 'entities.component.html',
    styleUrls: [ 'entities.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesPageComponent {

    name: string = 'hello';

    entities$: Observable<DynamicEntityObject[]> = this.entityDataService.getEntities();

    constructor(private entityDataService: EntitiesService) {}

    onAction($event) {
        console.log($event);
    }

}
