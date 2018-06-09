import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicFormArrayComponent, DynamicFormArrayHostComponent } from './dynamic-form-array.component';

@NgModule({
    imports: [ CommonModule, NgxdModule.forChild() ],
    declarations: [ DynamicFormArrayComponent, DynamicFormArrayHostComponent ],
    exports: [ DynamicFormArrayComponent ]
})
export class DynamicFormArrayModule {}
