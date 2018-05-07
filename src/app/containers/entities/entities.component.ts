import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EntitiesService, EntityObject } from '../../components/entities';

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
