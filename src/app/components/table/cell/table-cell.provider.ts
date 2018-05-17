import { InjectionToken, Provider, Type } from '@angular/core';
import { TableColumnTypes } from '../TableColumnTypes';
import { TableCellComponentBase } from './table-cell.component.base';

export interface TableCellEntityProvider {
    type: TableColumnTypes;
    component: Type<TableCellComponentBase>;
}

export const TABLE_CELL_ENTITY_PROVIDER = new InjectionToken<TableCellEntityProvider[]>('Table Cell Entity Provider');

export function provideTableCellEntity(type: TableColumnTypes, component: Type<TableCellComponentBase>): Provider {
    return {
        provide: TABLE_CELL_ENTITY_PROVIDER,
        useValue: { type, component }, multi: true
    };
}
