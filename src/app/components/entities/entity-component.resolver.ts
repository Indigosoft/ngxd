import { Inject, Injectable, Type } from '@angular/core';

import { ENTITY_PROVIDER, EntityProvider } from './entity.provider';
import { EntityObject } from './EntityObject';

@Injectable()
export class EntityComponentResolver {

    constructor(@Inject(ENTITY_PROVIDER) private providers: EntityProvider[]) {}

    resolve(entity: EntityObject): Type<any> {
        const entityProvider = this.providers.find((provider) => entity instanceof provider.entityType);

        if (!entityProvider) {
            return null;
        }

        return entityProvider.componentType;
    }

}
