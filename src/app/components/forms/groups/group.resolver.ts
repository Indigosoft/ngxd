import { Inject, Injectable, Type } from '@angular/core';
import { FormGroupSchema } from '@ngxd/forms';

import { FORM_GROUP_PROVIDER, FormGroupProvider } from './group.provider';

@Injectable()
export class FormGroupComponentResolver {

    private config: Map<Type<FormGroupSchema>, Type<any>>;

    constructor(@Inject(FORM_GROUP_PROVIDER) providers: FormGroupProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(column: FormGroupSchema): Type<any> {
        return this.config.get(column.constructor as Type<FormGroupSchema>);
    }

}
