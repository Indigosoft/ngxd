import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableCellModule } from './cell';
import { TableComponent } from './table.component';

@NgModule({
    imports: [ CommonModule, MatTableModule, TableCellModule ],
    declarations: [ TableComponent ],
    exports: [ TableComponent ]
})
export class TableModule {}
