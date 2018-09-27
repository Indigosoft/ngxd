import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';
import { DynamicTableColumnHostComponent, DynamicTableColumnComponent } from './dynamic-table-column.component';

@NgModule({
    imports: [ NgxdModule ],
    declarations: [ DynamicTableColumnHostComponent, DynamicTableColumnComponent ],
    exports: [ DynamicTableColumnComponent ]
})
export class DynamicTableColumnModule {}
