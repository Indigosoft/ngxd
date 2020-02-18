import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Provider, Type } from '@angular/core';
import { NgxdProvider } from '@ngxd/core';

import { DynamicTableColumnComponentBase } from './dynamic-table-column.base';
import { TableColumnTypes } from './TableColumnTypes';

export type TableColumnProvider = NgxdProvider<
  TableColumnTypes,
  Type<DynamicTableColumnComponentBase>
>;

export const TABLE_COLUMN_PROVIDER = new InjectionToken<TableColumnProvider[]>(
  'Table Column Provider'
);

export function provideTableColumn(
  type: TableColumnTypes,
  component: Type<DynamicTableColumnComponentBase>
): Provider[] {
  return [
    { provide: TABLE_COLUMN_PROVIDER, useValue: { type, component }, multi: true },
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
  ];
}
