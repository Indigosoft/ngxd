import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatListModule, MatTabsModule } from '@angular/material';

import { DynamicEntitiesModule } from '../../dynamic-entities';

import { COMPONENT, PROVIDERS } from './item.component';

@NgModule({
    imports: [
        CommonModule, DynamicEntitiesModule,
        MatButtonModule, MatCardModule, MatListModule, MatTabsModule
    ],
    declarations: [ COMPONENT ],
    providers: [ PROVIDERS ]
})
export class ItemEntityModule {}
