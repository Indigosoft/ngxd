import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { Top100ComponentsModule } from '../../components/top-100-components.module';
import { Native100BenchmarkComponent } from './native-100.component';

@NgModule({
    imports: [ CommonModule, MatButtonModule, Top100ComponentsModule ],
    declarations: [ Native100BenchmarkComponent ],
    exports: [ Native100BenchmarkComponent ]
})
export class Top100NativeBenchmarkModule {}
