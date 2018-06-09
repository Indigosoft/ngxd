import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormModule } from '../../dynamic-form';

import { COMPONENTS, PROVIDERS } from './group.component';
import { FormGroupComponentResolver } from './group.resolver';

@NgModule({
    imports: [ CommonModule, DynamicFormModule ],
    declarations: [ COMPONENTS ],
    entryComponents: [ COMPONENTS ],
    providers: [ PROVIDERS, FormGroupComponentResolver ]
})
export class FormGroupsModule {}
