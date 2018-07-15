import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatFormFieldModule } from '@angular/material';

import { COMPONENT, PROVIDERS } from './checkbox.component';

@NgModule({
    imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, MatCheckboxModule ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS ]
})
export class CheckboxControlModule {}
