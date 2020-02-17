import { EventEmitter, Input, Output, Directive } from '@angular/core';

import { TableColumn } from './TableColumn';

@Directive()
export class DynamicTableColumnComponentBase {
    @Input() row: any;
    @Input() column: TableColumn;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
}
