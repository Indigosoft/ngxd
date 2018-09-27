import { NgModule } from '@angular/core';
import { Top20NgSwitchBenchmarkModule } from './ng-switch-20/ng-switch-20.module';

@NgModule({
    exports: [
        Top20NgSwitchBenchmarkModule
        // Top100NgSwitchBenchmarkModule
        // Top1000NgSwitchBenchmarkModule
    ]
})
export class NgSwitchBenchmarkModule {}
