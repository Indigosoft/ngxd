import { BehaviorSubject, Observable } from 'rxjs';
import { ENTITIES } from './entities';
import { EntityObject } from './EntityObject';

export type Entities = EntityObject[];

export class EntitiesService {

    private entities$: BehaviorSubject<Entities> =
        new BehaviorSubject<Entities>(ENTITIES);

    getEntities(): Observable<EntityObject[]> {
        return this.entities$.asObservable();
    }

}
