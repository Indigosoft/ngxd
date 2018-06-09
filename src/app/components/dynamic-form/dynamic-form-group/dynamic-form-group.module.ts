import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicFormGroupComponent, DynamicFormGroupHostComponent } from './dynamic-form-group.component';

@NgModule({
    imports: [ CommonModule, NgxdModule.forChild() ],
    declarations: [ DynamicFormGroupComponent, DynamicFormGroupHostComponent ],
    exports: [ DynamicFormGroupComponent ]
})
export class DynamicFormGroupModule {}
