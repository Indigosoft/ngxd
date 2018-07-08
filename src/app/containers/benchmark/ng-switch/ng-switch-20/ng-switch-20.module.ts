import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { Top20ComponentsModule } from '../../components/top-20-components.module';
import { NgSwitch20BenchmarkComponent } from './ng-switch-20.component';

@NgModule({
    imports: [ CommonModule, MatButtonModule, Top20ComponentsModule ],
    declarations: [ NgSwitch20BenchmarkComponent ],
    exports: [ NgSwitch20BenchmarkComponent ]
})
export class Top20NgSwitchBenchmarkModule {}
