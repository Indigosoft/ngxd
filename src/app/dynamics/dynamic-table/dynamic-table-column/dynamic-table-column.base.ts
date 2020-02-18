import { EventEmitter, Input, Output, Directive } from '@angular/core';

import { TableColumn } from './TableColumn';

@Directive() // tslint:disable-next-line:directive-class-suffix
export class DynamicTableColumnComponentBase {
  @Input() row: any;
  @Input() column: TableColumn;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
}
