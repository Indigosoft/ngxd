import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';

import { DynamicEntitiesModule } from '@app/dynamics/dynamic-entities';
import { EntitiesModule } from '@app/components/entities';

import { EntitiesPageComponent } from './entities.component';
import { EntitiesRouting } from './entities.routing';

@NgModule({
    imports: [ CommonModule, DynamicEntitiesModule, EntitiesRouting, EntitiesModule, MatToolbarModule ],
    declarations: [ EntitiesPageComponent ]
})
export class EntitiesPageModule {}
