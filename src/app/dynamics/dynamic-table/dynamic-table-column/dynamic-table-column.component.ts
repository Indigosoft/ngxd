import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DynamicTableColumnComponentBase } from './dynamic-table-column.base';
import { TableColumnComponentResolver } from './dynamic-table-column.resolver';
import { TableColumn } from './TableColumn';

@Component({
  selector: 'app-dynamic-table-column',
  templateUrl: 'dynamic-table-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableColumnComponent extends DynamicTableColumnComponentBase {
  @Input() row: any;
  @Input() column: TableColumn;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  constructor(public resolver: TableColumnComponentResolver) {
    super();
  }
}
