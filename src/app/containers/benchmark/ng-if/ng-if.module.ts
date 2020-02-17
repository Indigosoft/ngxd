import { NgModule } from '@angular/core';
import { Top20NgIfBenchmarkModule } from './ng-if-20/ng-if-20.module';

@NgModule({
  exports: [
    Top20NgIfBenchmarkModule,
    // Top100NgIfBenchmarkModule
    // Top1000NgIfBenchmarkModule
  ],
})
export class NgIfBenchmarkModule {}
