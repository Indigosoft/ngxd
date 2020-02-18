import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { COMPONENT, PROVIDERS } from './checkbox.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatCheckboxModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class CheckboxControlModule {}
