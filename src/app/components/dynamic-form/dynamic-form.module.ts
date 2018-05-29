import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicControlModule } from './dynamic-control';

@NgModule({
    imports: [ CommonModule, DynamicControlModule, MatGridListModule ],
    declarations: [ DynamicFormComponent ],
    exports: [ DynamicFormComponent, DynamicControlModule ]
})
export class DynamicFormModule {}
