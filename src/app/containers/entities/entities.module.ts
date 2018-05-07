import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DynamicsModule } from '../../components/dynamics/dynamics.module';
import { EntitiesModule } from '../../components/entities/entities.module';

import { EntitiesPageComponent } from './entities.component';
import { EntitiesRouting } from './entities.routing';

@NgModule({
    imports: [
        CommonModule,
        DynamicsModule,
        EntitiesRouting,
        EntitiesModule,
        MatButtonModule,
        MatToolbarModule
    ],
    declarations: [
        EntitiesPageComponent
    ]
})
export class EntitiesPageModule {}
