import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { COMPONENTS, PROVIDERS } from './dropdown.component';

@NgModule({
    imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule ],
    declarations: [ COMPONENTS ],
    entryComponents: [ COMPONENTS ],
    providers: [ PROVIDERS ]
})
export class DropdownControlModule {}
