import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { DynamicControlsComponent } from './dynamic-controls.component';
import { DynamicControlModule } from './dynamic-control';

@NgModule({
    imports: [ CommonModule, DynamicControlModule, MatGridListModule ],
    declarations: [ DynamicControlsComponent ],
    exports: [ DynamicControlsComponent, DynamicControlModule ]
})
export class DynamicControlsModule {}
