import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { TableColumnSchemaModule } from './column-schema';
import { TableSchemaComponent } from './table-schema.component';

@NgModule({
    imports: [ CommonModule, MatGridListModule, TableColumnSchemaModule ],
    declarations: [ TableSchemaComponent ],
    exports: [ TableSchemaComponent ]
})
export class TableSchemaModule {}
