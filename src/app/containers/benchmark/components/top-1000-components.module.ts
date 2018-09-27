import { NgModule } from '@angular/core';
import { TOTAL_ITEMS } from '../benchmark.service';
import { Top100ComponentsModule } from './top-100-components.module';
import { TOP_1000_COMPONENTS } from './top-1000-components';

@NgModule({
    declarations: [ TOP_1000_COMPONENTS ],
    entryComponents: [ TOP_1000_COMPONENTS ],
    exports: [ TOP_1000_COMPONENTS, Top100ComponentsModule ],
    providers: [{ provide: TOTAL_ITEMS, useValue: 1000 }]
})
export class Top1000ComponentsModule {}
