import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { provideTableColumn } from '../table-column.provider';
import { TableColumn } from '../TableColumn';
import { TableColumnTypes } from '../TableColumnTypes';

@Component({
    selector: 'app-id-table-column',
    templateUrl: 'id.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdTableColumnEntityComponent {
    @Input() row: any;
    @Input() column: TableColumn;
}

export const COMPONENT = IdTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(TableColumnTypes.Id, IdTableColumnEntityComponent);
