import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule } from '@angular/material';

import { COMPONENT, PROVIDERS } from './ability.component';
import { SCHEMA_PROVIDERS } from './ability-schema.builder';

@NgModule({
    imports: [ CommonModule, MatCardModule, MatDividerModule ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS, SCHEMA_PROVIDERS ]
})
export class AbilityEntityModule {}
