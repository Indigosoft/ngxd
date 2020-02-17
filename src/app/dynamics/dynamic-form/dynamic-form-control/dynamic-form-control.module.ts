import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicFormControlComponent } from './dynamic-form-control.component';
import { FormControlComponentResolver } from './dynamic-form-control.resolver';

@NgModule({
  imports: [CommonModule, NgxdModule],
  declarations: [DynamicFormControlComponent],
  exports: [DynamicFormControlComponent],
  providers: [FormControlComponentResolver],
})
export class DynamicFormControlModule {}
