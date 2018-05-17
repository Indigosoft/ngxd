import { Component, Input } from '@angular/core';
import { TableColumn } from '../../TableColumn';
import { TableColumnTypes } from '../../TableColumnTypes';
import { TableCellComponentBase } from '../table-cell.component.base';
import { provideTableCellEntity } from '../table-cell.provider';

@Component({
    selector: 'icon-table-cell',
    template: '<div [ngClass]="row[column.def]" mat-card-avatar></div>',
    styleUrls: [ 'icon-table-cell.component.scss' ]
})
export class IconTableCellEntityComponent extends TableCellComponentBase {
    @Input() row: any;
    @Input() column: TableColumn;
}

export const IconTableCellEntityProvider = provideTableCellEntity(TableColumnTypes.Icon, IconTableCellEntityComponent);
