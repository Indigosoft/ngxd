import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService } from '../../benchmark.service';
import { NgxdBenchmarkComponent } from '../ngxd.component';

@Component({
    selector: 'app-ngxd-benchmark',
    templateUrl: '../ngxd.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ ItemsService ]
})
export class Ngxd1000BenchmarkComponent extends NgxdBenchmarkComponent {}
