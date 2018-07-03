import { NgModule } from '@angular/core';

import { DropdownControlModule } from './dropdown';
import { TextboxControlModule } from './textbox';

@NgModule({
    imports: [ DropdownControlModule, TextboxControlModule ]
})
export class FormControlsModule {}
