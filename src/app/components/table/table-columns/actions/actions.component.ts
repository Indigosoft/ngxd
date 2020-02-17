import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DynamicTableColumnComponentBase,
  provideTableColumn,
  TableColumnTypes,
} from '@app/dynamics';

@Component({
  selector: 'app-actions-table-column',
  templateUrl: 'actions.component.html',
  styleUrls: ['actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsTableColumnEntityComponent extends DynamicTableColumnComponentBase {}

export const COMPONENT = ActionsTableColumnEntityComponent;
export const PROVIDERS = provideTableColumn(
  TableColumnTypes.Actions,
  ActionsTableColumnEntityComponent
);
