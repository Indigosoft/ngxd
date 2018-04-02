import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ABILITY_COMPONENTS, ABILITY_PROVIDERS } from './index';

@NgModule({
    imports: [
        CommonModule,

        MatCardModule
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
