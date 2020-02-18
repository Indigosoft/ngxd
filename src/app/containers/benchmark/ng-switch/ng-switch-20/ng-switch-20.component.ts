import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService, MeasureService } from '../../benchmark.service';
import { NgSwitchBenchmarkComponent } from '../ng-switch.component';

// var template = (id) =>
//  `<app-dynamic-${String(id).padStart(5, 0)}
//    *ngSwitchCase="${id}"
//    [id]="item.id"
//    (event)="onEvent($event)"
//   ></app-dynamic-${String(id).padStart(5, 0)}>`;
//
// var a = Array.from({ length: 20 }, (_, i) => template(i + 1)).join('\r\n');
// copy(a);

@Component({
  selector: 'app-ng-switch-benchmark',
  templateUrl: 'ng-switch-20.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ItemsService],
})
export class NgSwitch20BenchmarkComponent extends NgSwitchBenchmarkComponent {
  constructor(items: ItemsService, measures: MeasureService) {
    super(items, measures);
  }
}
