import { Component, Input } from '@angular/core';
import { TableColumn } from '../../TableColumn';
import { TableColumnTypes } from '../../TableColumnTypes';
import { TableCellComponentBase } from '../table-cell.component.base';
import { provideTableCellEntity } from '../table-cell.provider';

@Component({
    selector: 'id-table-cell',
    template: '<b>#{{ row[column.def] }}</b>'
})
export class IdTableCellEntityComponent extends TableCellComponentBase {
    @Input() row: any;
    @Input() column: TableColumn;
}

export const IdTableCellEntityProvider = provideTableCellEntity(TableColumnTypes.Id, IdTableCellEntityComponent);
