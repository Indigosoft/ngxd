import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatListModule, MatTabsModule } from '@angular/material';

import { DynamicEntitiesModule } from '@app/dynamics/dynamic-entities';

import { COMPONENT, PROVIDERS } from './hero.component';
import { SCHEMA_PROVIDERS } from './hero-schema.builder';

@NgModule({
    imports: [
        CommonModule, DynamicEntitiesModule,
        MatButtonModule, MatCardModule, MatListModule, MatTabsModule
    ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS, SCHEMA_PROVIDERS ]
})
export class HeroEntityModule {}
