import { Inject, Injectable, Type } from '@angular/core';

import { LAZY_PROVIDER, LazyProvider } from './dynamic-lazy.provider';

@Injectable()
export class LazyComponentResolver {

    private config: Map<string, Type<any>>;

    constructor(@Inject(LAZY_PROVIDER) providers: LazyProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(name: string): Type<any> {
        return this.config.get(name);
    }

}
