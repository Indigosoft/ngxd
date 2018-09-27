import { NgModule } from '@angular/core';
import { TOTAL_ITEMS } from '../benchmark.service';
import { TOP_100_COMPONENTS } from './top-100-components';
import { Top20ComponentsModule } from './top-20-components.module';

@NgModule({
    declarations: [ TOP_100_COMPONENTS ],
    entryComponents: [ TOP_100_COMPONENTS ],
    exports: [ TOP_100_COMPONENTS, Top20ComponentsModule ],
    providers: [{ provide: TOTAL_ITEMS, useValue: 100 }]
})
export class Top100ComponentsModule {}
