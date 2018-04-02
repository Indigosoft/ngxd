import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { DynamicsModule } from '@app/components/dynamics/dynamics.module';

import { HERO_COMPONENTS, HERO_PROVIDERS } from './index';

@NgModule({
    imports: [
        CommonModule,

        DynamicsModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatTabsModule
    ],
    declarations: [
        HERO_COMPONENTS
    ],
    entryComponents: [
        HERO_COMPONENTS
    ],
    providers: [ HERO_PROVIDERS ]
})
export class HeroEntityModule {}
