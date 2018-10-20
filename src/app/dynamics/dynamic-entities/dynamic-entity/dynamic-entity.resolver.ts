import { Inject, Injectable, Type } from '@angular/core';
import { NgxdResolver } from '@ngxd/core';

import { DynamicEntityComponentBase } from './dynamic-entity.base';
import { DynamicEntityProvider, ENTITY_PROVIDER } from './dynamic-entity.provider';
import { DynamicEntityObject } from './DynamicEntityObject';

@Injectable()
export class EntityComponentResolver extends NgxdResolver<Type<DynamicEntityObject>, Type<DynamicEntityComponentBase>> {

    constructor(@Inject(ENTITY_PROVIDER) providers: DynamicEntityProvider[]) {
        super(providers);
    }

}
