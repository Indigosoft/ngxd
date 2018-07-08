import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService } from '../../benchmark.service';
import { NgSwitchBenchmarkComponent } from '../ng-switch.component';

// var template = (id) => `<app-dynamic-${String(id).padStart(5, 0)} *ngSwitchCase="${id}" [id]="item.id" (event)="onEvent($event)"></app-dynamic-${String(id).padStart(5, 0)}>`;
//
// var a = Array.from({ length: 1000 }, (_, i) => template(i + 1)).join('\r\n');
// copy(a);

@Component({
    selector: 'app-ng-switch-benchmark',
    templateUrl: 'ng-switch-1000.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ ItemsService ]
})
export class NgSwitch1000BenchmarkComponent extends NgSwitchBenchmarkComponent {}
