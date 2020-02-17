import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BenchmarkPageComponent } from './benchmark.component';
import { BenchmarkRouting } from './benchmark.routing';
import { NativeBenchmarkModule } from './native/native.module';
import { NgIfBenchmarkModule } from './ng-if/ng-if.module';
import { NgSwitchBenchmarkModule } from './ng-switch/ng-switch.module';

import { NgxdBenchmarkModule } from './ngxd/ngxd.module';

@NgModule({
  imports: [
    CommonModule,
    BenchmarkRouting,
    FormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    NgxdBenchmarkModule,
    NgSwitchBenchmarkModule,
    NgIfBenchmarkModule,
    NativeBenchmarkModule,
  ],
  declarations: [BenchmarkPageComponent],
})
export class BenchmarkPageModule {}
