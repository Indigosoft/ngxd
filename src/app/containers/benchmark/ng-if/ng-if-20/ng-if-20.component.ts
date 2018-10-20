import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService, MeasureService } from '../../benchmark.service';
import { NgIfBenchmarkComponent } from '../ng-if.component';

// var template = (id) => `<app-dynamic-${String(id).padStart(5, 0)} *ngIf="item.type === ${id}" [id]="item.id" (event)="onEvent($event)"></app-dynamic-${String(id).padStart(5, 0)}>`;
//
// var a = Array.from({ length: 20 }, (_, i) => template(i + 1)).join('\r\n');
// copy(a);

@Component({
    selector: 'app-ng-if-benchmark',
    templateUrl: 'ng-if-20.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ ItemsService ]
})
export class NgIf20BenchmarkComponent extends NgIfBenchmarkComponent {
    constructor(items: ItemsService, measures: MeasureService) {
        super(items, measures);
    }
}
