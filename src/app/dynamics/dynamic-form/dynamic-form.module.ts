import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormArrayModule } from './dynamic-form-array';
import { DynamicFormControlModule } from './dynamic-form-control';
import { DynamicFormGroupModule } from './dynamic-form-group';

import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  imports: [CommonModule, DynamicFormControlModule, DynamicFormGroupModule, DynamicFormArrayModule],
  declarations: [DynamicFormComponent],
  exports: [
    DynamicFormComponent,
    DynamicFormControlModule,
    DynamicFormGroupModule,
    DynamicFormArrayModule,
  ],
})
export class DynamicFormModule {}
