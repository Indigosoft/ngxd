import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicTableColumnComponentBase, provideTableColumn, TableColumnTypes } from '@app/dynamics';

@Component({
    selector: 'app-id-table-column',
    templateUrl: 'id.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdTableColumnEntityComponent extends DynamicTableColumnComponentBase {}

export const COMPONENT = IdTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(TableColumnTypes.Id, IdTableColumnEntityComponent);
