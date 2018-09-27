import { NgModule } from '@angular/core';
import { TableColumnModule } from './table-columns';
import { TableService } from './table.service';

@NgModule({
    exports: [ TableColumnModule ],
    providers: [ TableService ]
})
export class TableModule {}
