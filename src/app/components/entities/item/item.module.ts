import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { DynamicsModule } from '../../dynamic-entities/dynamics.module';

import { COMPONENTS, PROVIDERS } from './item.component';

@NgModule({
    imports: [ CommonModule, DynamicsModule, MatButtonModule, MatCardModule, MatListModule, MatTabsModule ],
    declarations: [ COMPONENTS ],
    entryComponents: [ COMPONENTS ],
    providers: [ PROVIDERS ]
})
export class ItemEntityModule {}
