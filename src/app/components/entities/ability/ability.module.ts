import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

import { ABILITY_COMPONENTS, ABILITY_PROVIDERS } from './index';

@NgModule({
    imports: [
        CommonModule,

        MatCardModule,
        MatDividerModule
    ],
    declarations: [
        ABILITY_COMPONENTS
    ],
    entryComponents: [
        ABILITY_COMPONENTS
    ],
    providers: [ ABILITY_PROVIDERS ]
})
export class AbilityEntityModule {}
