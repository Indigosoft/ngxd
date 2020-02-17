import { Inject, Injectable, Type } from '@angular/core';
import { NgxdResolver } from '@ngxd/core';

import { DynamicLazyComponentBase } from './dynamic-lazy.base';
import { LAZY_PROVIDER, LazyProvider } from './dynamic-lazy.provider';

@Injectable()
export class LazyComponentResolver extends NgxdResolver<string, Type<DynamicLazyComponentBase>> {
  constructor(@Inject(LAZY_PROVIDER) providers: LazyProvider[]) {
    super(providers);
  }
}
