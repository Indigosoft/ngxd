import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { NgxdModule } from '@ngxd/core';

import { TOP_20_COMPONENTS } from '../../components/top-20-components';
import { Top20ComponentsModule } from '../../components/top-20-components.module';
import { ComponentResolver } from '../ngxd.component';
import { Ngxd20BenchmarkComponent } from './ngxd-20.component';

export class Top20ComponentResolver extends ComponentResolver {
    constructor() {
        super(TOP_20_COMPONENTS);
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
    imports: [ CommonModule, NgxdModule, MatButtonModule, Top20ComponentsModule ],
    providers: [ { provide: ComponentResolver, useClass: Top20ComponentResolver } ],
    declarations: [ Ngxd20BenchmarkComponent, NgxdHostBenchmarkComponent ],
    exports: [ Ngxd20BenchmarkComponent ]
})
export class Top20NgxdBenchmarkModule {}
