import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatToolbarModule } from '@angular/material';
import { EntitiesModule } from '@app/components/entities';
import { FormSchemaModule } from '@app/components/form';
import { TableModule } from '@app/components/table';
import { DynamicTableModule } from '@app/dynamics/dynamic-table';
import { SchemasModule } from '@app/schemas/composite-schema';
import { EntitySchemaModule } from '@app/schemas/entity-schema';
import { TableSchemaModule } from '@app/schemas/table-schema';

import { TablePageComponent } from './table.component';
import { TableRouting } from './table.routing';

@NgModule({
    imports: [
        CommonModule, TableRouting,
        SchemasModule, EntitiesModule, EntitySchemaModule, FormSchemaModule,
        DynamicTableModule, TableModule, TableSchemaModule,
        MatCardModule, MatToolbarModule, MatGridListModule, MatButtonModule, MatDialogModule
    ],
    declarations: [ TablePageComponent ]
})
export class TablePageModule {}
