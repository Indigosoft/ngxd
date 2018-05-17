import { Component, Input } from '@angular/core';
import { TableColumn } from '../../TableColumn';
import { TableColumnTypes } from '../../TableColumnTypes';
import { TableCellComponentBase } from '../table-cell.component.base';
import { provideTableCellEntity } from '../table-cell.provider';

@Component({
    selector: 'text-table-cell',
    template: '<i>{{ row[column.def] }}</i>'
})
export class TextTableCellEntityComponent extends TableCellComponentBase {
    @Input() row: any;
    @Input() column: TableColumn;
}

export const TextTableCellEntityProvider = provideTableCellEntity(TableColumnTypes.Text, TextTableCellEntityComponent);
