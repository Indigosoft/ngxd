import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicFormArrayComponent, DynamicFormArrayHostComponent } from './dynamic-form-array.component';
import { FormArrayComponentResolver } from './dynamic-form-array.resolver';

@NgModule({
    imports: [ CommonModule, NgxdModule.forChild() ],
    declarations: [ DynamicFormArrayComponent, DynamicFormArrayHostComponent ],
    exports: [ DynamicFormArrayComponent ],
    providers: [ FormArrayComponentResolver ]
})
export class DynamicFormArrayModule {}
