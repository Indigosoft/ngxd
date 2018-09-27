import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { provideTableColumn } from '../table-column.provider';
import { TableColumn } from '../TableColumn';
import { TableColumnTypes } from '../TableColumnTypes';

@Component({
    selector: 'app-text-table-column',
    templateUrl: 'text.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextTableColumnEntityComponent {
    @Input() row: any;
    @Input() column: TableColumn;
}

export const COMPONENT = TextTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(TableColumnTypes.Text, TextTableColumnEntityComponent);
