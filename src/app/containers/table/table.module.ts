import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatGridListModule, MatToolbarModule } from '@angular/material';
import { DynamicTableModule } from '../../components/dynamic-table';
import { EntitiesModule } from '../../components/entities';
import { FormsSchemaModule } from '../../components/forms';
import { TableColumnModule } from '../../components/table-columns';
import { TableSchemaModule } from '../../components/table-schema';

import { TablePageComponent } from './table.component';
import { TableDataSourceBuilder } from './table.datasource';
import { TableRouting } from './table.routing';

@NgModule({
    imports: [
        CommonModule, TableRouting,
        EntitiesModule, FormsSchemaModule,
        DynamicTableModule, TableColumnModule, TableSchemaModule,
        MatCardModule, MatToolbarModule, MatGridListModule, MatButtonModule
    ],
    declarations: [ TablePageComponent ],
    providers: [ TableDataSourceBuilder ]
})
export class TablePageModule {}
