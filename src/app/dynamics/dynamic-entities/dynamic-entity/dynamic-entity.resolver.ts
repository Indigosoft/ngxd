import { Inject, Injectable, Type } from '@angular/core';

import { ENTITY_PROVIDER, DynamicEntityProvider } from './dynamic-entity.provider';
import { DynamicEntityObject } from './DynamicEntityObject';

@Injectable()
export class EntityComponentResolver {

    private config: Map<Type<DynamicEntityObject>, Type<any>>;

    constructor(@Inject(ENTITY_PROVIDER) providers: DynamicEntityProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(entity: DynamicEntityObject): Type<any> {
        return this.config.get(entity.constructor as Type<DynamicEntityObject>);
    }

}
