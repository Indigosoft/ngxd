import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DynamicFormModule } from '../../dynamic-form';

import { COMPONENTS, PROVIDERS } from './array.component';
import { FormArrayComponentResolver } from './array.resolver';

@NgModule({
    imports: [ CommonModule, MatGridListModule, DynamicFormModule ],
    declarations: [ COMPONENTS ],
    entryComponents: [ COMPONENTS ],
    providers: [ PROVIDERS, FormArrayComponentResolver ]
})
export class FormArraysModule {}
