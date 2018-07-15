import { NgModule } from '@angular/core';

import { CheckboxControlModule } from './checkbox';
import { DropdownControlModule } from './dropdown';
import { TextboxControlModule } from './textbox';

@NgModule({
    imports: [ CheckboxControlModule, DropdownControlModule, TextboxControlModule ]
})
export class FormControlsModule {}
