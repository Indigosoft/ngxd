import { NgModule } from '@angular/core';
import { LazyComponentResolver } from '../dynamic-lazy';

import { HelloLazyModule } from './hello';

@NgModule({
    providers: [ LazyComponentResolver ],
    exports: [ HelloLazyModule ]
})
export class LazyModule {}

// export default LazyModule;
