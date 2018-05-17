import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENTITIES } from './entities';
import { EntityObject } from './EntityObject';

export type Entities = EntityObject[];

export class EntitiesService {

    private entities$: BehaviorSubject<Entities> =
        new BehaviorSubject<Entities>(ENTITIES);

    getEntities(): Observable<EntityObject[]> {
        return this.entities$.asObservable();
    }

    getFlattenEntities(): Observable<EntityObject[]> {
        return this.getEntities().pipe(map((entities) =>
            entities.reduce((acc, entity) => [
                ...acc, entity, ...entity.flatten()
            ], [])));
    }

}
