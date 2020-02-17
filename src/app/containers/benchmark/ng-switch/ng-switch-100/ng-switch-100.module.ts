import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Top100ComponentsModule } from '../../components/top-100-components.module';
import { NgSwitch100BenchmarkComponent } from './ng-switch-100.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, Top100ComponentsModule],
  declarations: [NgSwitch100BenchmarkComponent],
  exports: [NgSwitch100BenchmarkComponent],
})
export class Top100NgSwitchBenchmarkModule {}
