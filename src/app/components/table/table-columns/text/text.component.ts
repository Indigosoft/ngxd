import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DynamicTableColumnComponentBase,
  provideTableColumn,
  TableColumnTypes,
} from '@app/dynamics';

@Component({
  selector: 'app-text-table-column',
  templateUrl: 'text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTableColumnEntityComponent extends DynamicTableColumnComponentBase {}

export const COMPONENT = TextTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(TableColumnTypes.Text, TextTableColumnEntityComponent);
