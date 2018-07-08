import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';

import { DynamicEntitiesModule } from '../../components/dynamic-entities';
import { EntitiesModule } from '../../components/entities/entities.module';

import { EntitiesPageComponent } from './entities.component';
import { EntitiesRouting } from './entities.routing';

@NgModule({
    imports: [ CommonModule, DynamicEntitiesModule, EntitiesRouting, EntitiesModule, MatToolbarModule ],
    declarations: [ EntitiesPageComponent ]
})
export class EntitiesPageModule {}
