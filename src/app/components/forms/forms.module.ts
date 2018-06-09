import { NgModule } from '@angular/core';

import { FormArraysModule } from './arrays/array.module';
import { FormControlsModule } from './controls/control.module';
import { FormGroupsModule } from './groups/group.module';

@NgModule({
    exports: [ FormArraysModule, FormControlsModule, FormGroupsModule ]
})
export class FormsSchemaModule {}
