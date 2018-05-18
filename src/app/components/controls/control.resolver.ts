import { Inject, Injectable, Type } from '@angular/core';

import { ControlBase } from './ControlBase';

import { CONTROL_PROVIDER, ControlProvider } from './control.provider';

@Injectable()
export class ControlComponentResolver {

    private config: Map<Type<ControlBase>, Type<any>>;

    constructor(@Inject(CONTROL_PROVIDER) providers: ControlProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(column: ControlBase): Type<any> {
        return this.config.get(column.constructor as Type<ControlBase>);
    }

}
