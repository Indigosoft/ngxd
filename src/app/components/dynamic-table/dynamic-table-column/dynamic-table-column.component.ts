import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableColumnComponentResolver, TableColumn } from '../../table-columns';

@Component({
    selector: 'app-dynamic-table-column-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableColumnHostComponent {
    @Input() row: any;
    @Input() column: TableColumn;
}

@Component({
    selector: 'app-dynamic-table-column',
    templateUrl: 'dynamic-table-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableColumnComponent {
    @Input() row: any;
    @Input() column: TableColumn;

    constructor(public resolver: TableColumnComponentResolver) {}
}
