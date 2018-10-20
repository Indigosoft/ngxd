import { EventEmitter, Input, Output } from '@angular/core';

import { TableColumn } from './TableColumn';

export class DynamicTableColumnComponentBase {
    @Input() row: any;
    @Input() column: TableColumn;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
}
