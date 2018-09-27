import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService } from '../../benchmark.service';
import { NativeBenchmarkComponent } from '../native.component';

@Component({
    selector: 'app-native-benchmark',
    templateUrl: 'native-100.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ ItemsService ]
})
export class Native100BenchmarkComponent extends NativeBenchmarkComponent {}
