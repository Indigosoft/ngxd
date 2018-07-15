import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { provideTableColumn } from '../table-column.provider';
import { TableColumn } from '../TableColumn';
import { TableColumnTypes } from '../TableColumnTypes';

@Component({
    selector: 'app-actions-table-column',
    templateUrl: 'actions.component.html',
    styleUrls: [ 'actions.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsTableColumnEntityComponent {
    @Input() row: any;
    @Input() column: TableColumn;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
}

export const COMPONENT = ActionsTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(TableColumnTypes.Actions, ActionsTableColumnEntityComponent);
