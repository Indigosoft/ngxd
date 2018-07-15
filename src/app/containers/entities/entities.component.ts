import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicEntityObject } from '@app/dynamics/dynamic-entities';
import { EntitiesService } from '@app/components/entities';

@Component({
    selector: 'app-entities-page',
    templateUrl: 'entities.component.html',
    styleUrls: [ 'entities.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesPageComponent {

    entities$: Observable<DynamicEntityObject[]> = this.entityDataService.getEntities();

    constructor(private entityDataService: EntitiesService) {}

}
