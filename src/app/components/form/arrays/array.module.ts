import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material';
import { DynamicFormModule } from '@app/dynamics/dynamic-form';

import { COMPONENT, PROVIDERS } from './array.component';

@NgModule({
    imports: [ CommonModule, MatGridListModule, DynamicFormModule ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS ]
})
export class FormArraysModule {}
