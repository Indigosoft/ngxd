import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EntitiesModule } from '../../components/entities/entities.module';
import { TableModule } from '../../components/table';

import { TablePageComponent } from './table.component';
import { TableRouting } from './table.routing';

@NgModule({
    imports: [
        CommonModule, TableRouting,
        TableModule, EntitiesModule,
        MatCardModule, MatToolbarModule
    ],
    declarations: [ TablePageComponent ]
})
export class TablePageModule {}
