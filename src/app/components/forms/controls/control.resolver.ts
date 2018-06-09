import { Inject, Injectable, Type } from '@angular/core';
import { FormControlSchema } from '@ngxd/forms';

import { FORM_CONTROL_PROVIDER, FormControlProvider } from './control.provider';

@Injectable()
export class FormControlComponentResolver {

    private config: Map<Type<FormControlSchema>, Type<any>>;

    constructor(@Inject(FORM_CONTROL_PROVIDER) providers: FormControlProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(column: FormControlSchema): Type<any> {
        return this.config.get(column.constructor as Type<FormControlSchema>);
    }

}
