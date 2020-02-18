import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService, MeasureService } from '../../benchmark.service';
import { ComponentResolver, NgxdBenchmarkComponent } from '../ngxd.component';

@Component({
  selector: 'app-ngxd-benchmark',
  templateUrl: '../ngxd.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ItemsService],
})
export class Ngxd1000BenchmarkComponent extends NgxdBenchmarkComponent {
  constructor(resolver: ComponentResolver, items: ItemsService, measures: MeasureService) {
    super(resolver, items, measures);
  }
}
