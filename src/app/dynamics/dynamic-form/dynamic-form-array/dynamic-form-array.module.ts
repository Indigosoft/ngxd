import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicFormArrayComponent } from './dynamic-form-array.component';
import { FormArrayComponentResolver } from './dynamic-form-array.resolver';

@NgModule({
    imports: [ CommonModule, NgxdModule ],
    declarations: [ DynamicFormArrayComponent ],
    exports: [ DynamicFormArrayComponent ],
    providers: [ FormArrayComponentResolver ]
})
export class DynamicFormArrayModule {}
