import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicFormControlComponent, DynamicFormControlHostComponent } from './dynamic-form-control.component';
import { FormControlComponentResolver } from './dynamic-form-control.resolver';

@NgModule({
    imports: [ CommonModule, NgxdModule.forChild() ],
    declarations: [ DynamicFormControlComponent, DynamicFormControlHostComponent ],
    exports: [ DynamicFormControlComponent ],
    providers: [ FormControlComponentResolver ]
})
export class DynamicFormControlModule {}
