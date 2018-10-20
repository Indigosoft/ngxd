import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';

import { BenchmarkPageComponent } from './benchmark.component';
import { BenchmarkRouting } from './benchmark.routing';
import { ItemsService } from './benchmark.service';
import { NativeBenchmarkModule } from './native/native.module';
import { NgIfBenchmarkModule } from './ng-if/ng-if.module';
import { NgSwitchBenchmarkModule } from './ng-switch/ng-switch.module';

import { NgxdBenchmarkModule } from './ngxd/ngxd.module';

@NgModule({
    imports: [
        CommonModule, BenchmarkRouting, FormsModule, MatToolbarModule, MatGridListModule,
        MatSelectModule, MatFormFieldModule, MatButtonModule, MatTabsModule, MatTableModule,
        MatCardModule, NgxdBenchmarkModule, NgSwitchBenchmarkModule, NgIfBenchmarkModule, NativeBenchmarkModule
    ],
    declarations: [ BenchmarkPageComponent ]
})
export class BenchmarkPageModule {}
