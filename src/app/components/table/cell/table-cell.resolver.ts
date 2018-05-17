import { Inject, Injectable, Type } from '@angular/core';

import { TableColumn } from '../TableColumn';
import { TableColumnTypes } from '../TableColumnTypes';

import { TABLE_CELL_ENTITY_PROVIDER, TableCellEntityProvider } from './table-cell.provider';

@Injectable()
export class TableCellEntityComponentResolver {

    private config: Map<TableColumnTypes, Type<any>>;

    constructor(@Inject(TABLE_CELL_ENTITY_PROVIDER) providers: TableCellEntityProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(column: TableColumn): Type<any> {
        return this.config.get(column.type);
    }

}
