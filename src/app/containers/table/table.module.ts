import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatToolbarModule } from '@angular/material';
import { EntitiesModule, FormSchemaModule, TableModule } from '@app/components';
import { DynamicTableModule } from '@app/dynamics';
import { EntitySchemaModule, SchemasModule, TableSchemaModule } from '@app/schemas';

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
