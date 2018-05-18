import { NgModule } from '@angular/core';
import { NgxComponentOutletModule } from '../../../../../lib/ngx-component-outlet';
import { DynamicTableColumnHostComponent, DynamicTableColumnComponent } from './dynamic-table-column.component';

@NgModule({
    imports: [ NgxComponentOutletModule.forChild() ],
    declarations: [ DynamicTableColumnHostComponent, DynamicTableColumnComponent ],
    exports: [ DynamicTableColumnComponent ]
})
export class DynamicTableColumnModule {}
