import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DynamicTableColumnModule } from './dynamic-table-column';
import { DynamicTableComponent } from './dynamic-table.component';

@NgModule({
    imports: [ CommonModule, MatTableModule, DynamicTableColumnModule ],
    declarations: [ DynamicTableComponent ],
    exports: [ DynamicTableComponent ]
})
export class DynamicTableModule {}
