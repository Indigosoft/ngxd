import { NgModule } from '@angular/core';

import { FormArraysModule } from './arrays';
import { FormControlsModule } from './controls';
import { FormGroupsModule } from './groups';

@NgModule({
  exports: [FormArraysModule, FormControlsModule, FormGroupsModule],
})
export class FormSchemaModule {}
