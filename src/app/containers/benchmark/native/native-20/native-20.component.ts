import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService } from '../../benchmark.service';
import { NativeBenchmarkComponent } from '../native.component';

@Component({
    selector: 'app-native-benchmark',
    templateUrl: 'native-20.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ ItemsService ]
})
export class Native20BenchmarkComponent extends NativeBenchmarkComponent {}
