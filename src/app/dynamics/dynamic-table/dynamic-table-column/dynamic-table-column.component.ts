import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumnComponentResolver, TableColumn } from '@app/components/table';

@Component({
    selector: 'app-dynamic-table-column-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableColumnHostComponent {
    @Input() row: any;
    @Input() column: TableColumn;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
    selector: 'app-dynamic-table-column',
    templateUrl: 'dynamic-table-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableColumnComponent {
    @Input() row: any;
    @Input() column: TableColumn;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();

    constructor(public resolver: TableColumnComponentResolver) {}
}
