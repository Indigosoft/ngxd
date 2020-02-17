import { NgModule } from '@angular/core';
import { Top20NativeBenchmarkModule } from './native-20/native-20.module';

@NgModule({
  exports: [
    Top20NativeBenchmarkModule,
    // Top100NativeBenchmarkModule
    // Top1000NativeBenchmarkModule
  ],
})
export class NativeBenchmarkModule {}
