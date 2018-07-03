import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { COMPONENTS, PROVIDERS } from './textbox.component';

@NgModule({
    imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule ],
    declarations: [ COMPONENTS ],
    entryComponents: [ COMPONENTS ],
    providers: [ PROVIDERS ]
})
export class TextboxControlModule {}
