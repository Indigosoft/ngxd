import { NgModule } from '@angular/core';
import { TOTAL_ITEMS } from '../benchmark.service';
import { TOP_20_COMPONENTS } from './top-20-components';

@NgModule({
  declarations: [TOP_20_COMPONENTS],
  entryComponents: [TOP_20_COMPONENTS],
  exports: [TOP_20_COMPONENTS],
  providers: [{ provide: TOTAL_ITEMS, useValue: 20 }],
})
export class Top20ComponentsModule {}
