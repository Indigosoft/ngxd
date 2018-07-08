import { Inject, Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENTITIES_DATA_PROVIDER } from './dynamic-entities.provider';
import { DynamicEntityObject } from './index';

function flatten(array: DynamicEntityObject[]): DynamicEntityObject[] {
    return array.reduce((acc, item) => [
        ...acc, item, ...item.flatten()
    ], []);
}

function random(array: DynamicEntityObject[]): DynamicEntityObject {
    return array[ Math.floor(Math.random() * array.length) ];
}

export type Entities = DynamicEntityObject[];

@Injectable()
export class DynamicEntitiesService {

    private entities$: BehaviorSubject<Entities>;

    constructor(@Inject(ENTITIES_DATA_PROVIDER) entities: DynamicEntityObject[]) {
        this.entities$ = new BehaviorSubject<Entities>(entities);
    }

    createEntity() {
        const entity: DynamicEntityObject = random(flatten(this.entities$.value));

        if (!entity) {
            return;
        }

        const ctor: Type<DynamicEntityObject> = entity.constructor as Type<DynamicEntityObject>;

        this.entities$.next([
            new ctor({ ...entity, id: null }), ...this.entities$.value
        ]);
    }

    deleteEntity() {
        const entity: DynamicEntityObject = random(this.entities$.value);
        this.entities$.next(this.entities$.value.filter(_ => _ !== entity));
    }

    getEntities(): Observable<DynamicEntityObject[]> {
        return this.entities$.asObservable();
    }

    getFlattenEntities(): Observable<DynamicEntityObject[]> {
        return this.getEntities().pipe(map(flatten));
    }

}
