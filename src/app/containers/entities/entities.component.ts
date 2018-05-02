import { Component } from '@angular/core';
import { EntitiesService } from '@app/components/entities/entities.service';
import { EntityObject } from '@app/components/entities/EntityObject';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-entities-page',
    templateUrl: 'entities.component.html',
    styleUrls: [ 'entities.component.scss' ]
})
export class EntitiesPageComponent {

    entities$: Observable<EntityObject[]> =
        this.entityDataService.getEntities();

    constructor(private entityDataService: EntitiesService) {}

}
