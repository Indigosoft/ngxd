import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { Top1000ComponentsModule } from '../../components/top-1000-components.module';
import { NgSwitch1000BenchmarkComponent } from './ng-switch-1000.component';

@NgModule({
    imports: [ CommonModule, MatButtonModule, Top1000ComponentsModule ],
    declarations: [ NgSwitch1000BenchmarkComponent ],
    exports: [ NgSwitch1000BenchmarkComponent ]
})
export class Top1000NgSwitchBenchmarkModule {}
