import { Injectable } from '@angular/core';
import { DynamicEntityObject } from '@app/dynamics';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENTITIES_DATA } from './entities.data';

function flatEntity(entity: DynamicEntityObject): DynamicEntityObject[] {
    return [ entity ].concat(...Object.values(entity).filter(Array.isArray));
}

function flatEntities(entities: DynamicEntityObject[]): DynamicEntityObject[] {
    return entities.reduce((acc, entity) => [ ...acc, ...flatEntity(entity) ], []);
}

export type Entities = DynamicEntityObject[];

@Injectable()
export class EntitiesService {

    private entities$: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(ENTITIES_DATA);

    createEntity(createdEntity: DynamicEntityObject) {
        this.entities$.next([ createdEntity, ...this.entities$.value ]);
    }

    updateEntity(updatedEntity: DynamicEntityObject) {
        this.entities$.next(this.entities$.value.map((item) => item.id !== updatedEntity.id ? item : updatedEntity));
    }

    deleteEntity(deletedEntity: DynamicEntityObject) {
        this.entities$.next(this.entities$.value.filter((item) => item.id !== deletedEntity.id));
    }

    getEntities(): Observable<DynamicEntityObject[]> {
        return this.entities$.asObservable();
    }

    getFlattenEntities(): Observable<DynamicEntityObject[]> {
        return this.getEntities().pipe(map(flatEntities));
    }

}
