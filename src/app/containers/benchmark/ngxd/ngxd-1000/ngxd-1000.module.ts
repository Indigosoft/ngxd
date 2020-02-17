import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { NgxdModule } from '@ngxd/core';
import { TOP_100_COMPONENTS } from '../../components/top-100-components';

import { TOP_1000_COMPONENTS } from '../../components/top-1000-components';
import { Top1000ComponentsModule } from '../../components/top-1000-components.module';
import { TOP_20_COMPONENTS } from '../../components/top-20-components';
import { ComponentResolver } from '../ngxd.component';
import { Ngxd1000BenchmarkComponent } from './ngxd-1000.component';

@Injectable()
export class Top1000ComponentResolver extends ComponentResolver {
    constructor() {
        super([ ...TOP_20_COMPONENTS, ...TOP_100_COMPONENTS, ...TOP_1000_COMPONENTS ]);
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
    imports: [ CommonModule, NgxdModule, MatButtonModule, Top1000ComponentsModule ],
    providers: [ { provide: ComponentResolver, useClass: Top1000ComponentResolver } ],
    declarations: [ Ngxd1000BenchmarkComponent, NgxdHostBenchmarkComponent ],
    exports: [ Ngxd1000BenchmarkComponent ]
})
export class Top1000NgxdBenchmarkModule {}
