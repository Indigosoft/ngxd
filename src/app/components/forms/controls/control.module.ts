import { NgModule } from '@angular/core';

import { FormControlComponentResolver } from './control.resolver';
import { DropdownControlModule } from './dropdown/dropdown.module';
import { TextboxControlModule } from './textbox/textbox.module';

@NgModule({
    imports: [ DropdownControlModule, TextboxControlModule ],
    providers: [ FormControlComponentResolver ]
})
export class FormControlsModule {}
