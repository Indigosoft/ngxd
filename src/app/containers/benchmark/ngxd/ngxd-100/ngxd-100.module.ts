import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { NgxdModule } from '@ngxd/core';

import { TOP_100_COMPONENTS } from '../../components/top-100-components';
import { Top100ComponentsModule } from '../../components/top-100-components.module';
import { TOP_20_COMPONENTS } from '../../components/top-20-components';
import { ComponentResolver } from '../ngxd.component';
import { Ngxd100BenchmarkComponent } from './ngxd-100.component';

@Injectable()
export class Top100ComponentResolver extends ComponentResolver {
    constructor() {
        super([ ...TOP_20_COMPONENTS, ...TOP_100_COMPONENTS ]);
    }
}

@Component({
    selector: 'app-ngxd-host-benchmark',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxdHostBenchmarkComponent {
    @Input() id: number;
    @Output() event: EventEmitter<number> = new EventEmitter<number>();
}

@NgModule({
    imports: [ CommonModule, NgxdModule, MatButtonModule, Top100ComponentsModule ],
    providers: [ { provide: ComponentResolver, useClass: Top100ComponentResolver } ],
    declarations: [ Ngxd100BenchmarkComponent, NgxdHostBenchmarkComponent ],
    exports: [ Ngxd100BenchmarkComponent ]
})
export class Top100NgxdBenchmarkModule {}
