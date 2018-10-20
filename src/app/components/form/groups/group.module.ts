import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLineModule } from '@angular/material';
import { DynamicFormModule } from '@app/dynamics';

import { COMPONENT, PROVIDERS } from './group.component';

@NgModule({
    imports: [ CommonModule, DynamicFormModule, MatLineModule ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS ]
})
export class FormGroupsModule {}
