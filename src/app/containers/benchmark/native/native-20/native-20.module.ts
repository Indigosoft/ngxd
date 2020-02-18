import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Top20ComponentsModule } from '../../components/top-20-components.module';
import { Native20BenchmarkComponent } from './native-20.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, Top20ComponentsModule],
  declarations: [Native20BenchmarkComponent],
  exports: [Native20BenchmarkComponent],
})
export class Top20NativeBenchmarkModule {}
