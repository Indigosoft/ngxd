import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { COMPONENT, PROVIDERS } from './textbox.component';

@NgModule({
    imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS ]
})
export class TextboxControlModule {}
