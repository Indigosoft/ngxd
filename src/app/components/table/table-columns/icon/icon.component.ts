import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { provideTableColumn } from '../table-column.provider';
import { TableColumn } from '../TableColumn';
import { TableColumnTypes } from '../TableColumnTypes';

@Component({
    selector: 'app-icon-table-column',
    templateUrl: 'icon.component.html',
    styleUrls: [ 'icon.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTableColumnEntityComponent {
    @Input() row: any;
    @Input() column: TableColumn;
}

export const COMPONENT = IconTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(TableColumnTypes.Icon, IconTableColumnEntityComponent);
