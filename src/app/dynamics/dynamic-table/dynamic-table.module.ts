import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatTableModule } from '@angular/material';
import { DynamicTableColumnModule } from './dynamic-table-column';
import { DynamicTableComponent } from './dynamic-table.component';

@NgModule({
    imports: [ CommonModule, MatButtonModule, MatTableModule, DynamicTableColumnModule ],
    declarations: [ DynamicTableComponent ],
    exports: [ DynamicTableComponent ]
})
export class DynamicTableModule {}
