import { List } from 'immutable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ENTITIES } from './entities';
import { EntityObject } from './EntityObject';

export type Entities = List<EntityObject>;

export class EntitiesService {

    private entities$: BehaviorSubject<Entities> =
        new BehaviorSubject<Entities>(List<EntityObject>(ENTITIES));

    getEntities(): Observable<EntityObject[]> {
        return this.entities$.asObservable().map((entities) => entities.toJS());
    }

}
