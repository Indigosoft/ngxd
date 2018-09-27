import { Inject, Injectable, Type } from '@angular/core';

import { TABLE_COLUMN_PROVIDER, TableColumnProvider } from './table-column.provider';
import { TableColumn } from './TableColumn';
import { TableColumnTypes } from './TableColumnTypes';

@Injectable()
export class TableColumnComponentResolver {

    private config: Map<TableColumnTypes, Type<any>>;

    constructor(@Inject(TABLE_COLUMN_PROVIDER) providers: TableColumnProvider[]) {
        this.config = providers.reduce((config, provider) =>
            config.set(provider.type, provider.component), new Map());
    }

    resolve(column: TableColumn): Type<any> {
        return this.config.get(column.type);
    }

}
