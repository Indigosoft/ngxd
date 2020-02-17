import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Top1000ComponentsModule } from '../../components/top-1000-components.module';
import { Native1000BenchmarkComponent } from './native-1000.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, Top1000ComponentsModule],
  declarations: [Native1000BenchmarkComponent],
  exports: [Native1000BenchmarkComponent],
})
export class Top1000NativeBenchmarkModule {}
