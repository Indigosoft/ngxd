import { NgModule } from '@angular/core';
import { LazyComponentResolver } from '@app/dynamics/dynamic-lazy';

import { HelloLazyModule } from './hello';

@NgModule({
    providers: [ LazyComponentResolver ],
    exports: [ HelloLazyModule ]
})
export class LazyModule {}
