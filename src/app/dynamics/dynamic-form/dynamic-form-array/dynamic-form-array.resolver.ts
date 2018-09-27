import { Inject, Injectable, Type } from '@angular/core';
import { FormArraySchema } from '@ngxd/forms';

import { FORM_ARRAY_PROVIDER, FormArrayProvider } from './dynamic-form-array.provider';

@Injectable()
export class FormArrayComponentResolver {

    private readonly config: Map<Type<FormArraySchema>, Type<any>>;

    constructor(@Inject(FORM_ARRAY_PROVIDER) providers: FormArrayProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(column: FormArraySchema): Type<any> {
        return this.config.get(column.constructor as Type<FormArraySchema>);
    }

}
