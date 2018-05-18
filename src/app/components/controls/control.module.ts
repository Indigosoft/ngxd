import { NgModule } from '@angular/core';

import { ControlComponentResolver } from './control.resolver';

import { DropdownControlModule } from './dropdown/dropdown.module';
import { TextboxControlModule } from './textbox/textbox.module';

@NgModule({
    imports: [ DropdownControlModule, TextboxControlModule ],
    providers: [ ControlComponentResolver ]
})
export class ControlsModule {}
