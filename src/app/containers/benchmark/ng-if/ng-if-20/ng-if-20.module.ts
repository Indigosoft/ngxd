import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Top20ComponentsModule } from '../../components/top-20-components.module';
import { NgIf20BenchmarkComponent } from './ng-if-20.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, Top20ComponentsModule],
  declarations: [NgIf20BenchmarkComponent],
  exports: [NgIf20BenchmarkComponent],
})
export class Top20NgIfBenchmarkModule {}
