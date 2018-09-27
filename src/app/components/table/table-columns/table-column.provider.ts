import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, Provider, Type } from '@angular/core';
import { TableColumnTypes } from './TableColumnTypes';

export interface TableColumnProvider {
    type: TableColumnTypes;
    component: Type<any>;
}

export const TABLE_COLUMN_PROVIDER = new InjectionToken<TableColumnProvider[]>('Table Column Provider');

export function provideTableColumn(type: TableColumnTypes, component: Type<any>): Provider[] {
    return [
        { provide: TABLE_COLUMN_PROVIDER, useValue: { type, component }, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true }
    ];
}
