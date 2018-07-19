import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { DynamicFormModule } from '@app/dynamics/dynamic-form';

import { COMPONENT, PROVIDERS } from './array.component';

@NgModule({
    imports: [ CommonModule, FlexLayoutModule, MatCardModule, DynamicFormModule ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS ]
})
export class FormArraysModule {}
