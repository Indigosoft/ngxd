import { Inject, Injectable, Type } from '@angular/core';

import { ENTITY_PROVIDER, EntityProvider } from './entity.provider';
import { EntityObject } from './EntityObject';

@Injectable()
export class EntityComponentResolver {

    private config: Map<Type<EntityObject>, Type<any>>;

    constructor(@Inject(ENTITY_PROVIDER) providers: EntityProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(entity: EntityObject): Type<any> {
        return this.config.get(entity.constructor as Type<EntityObject>);
    }

}
