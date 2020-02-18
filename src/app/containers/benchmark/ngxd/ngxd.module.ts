import { NgModule } from '@angular/core';
import { Top20NgxdBenchmarkModule } from './ngxd-20/ngxd-20.module';

@NgModule({
  exports: [
    Top20NgxdBenchmarkModule,
    // Top100NgxdBenchmarkModule
    // Top1000NgxdBenchmarkModule
  ],
})
export class NgxdBenchmarkModule {}
