import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableSchema } from './TableSchema';
import { TableColumn, TableColumnTypes } from './table-columns';

const TABLE_SCHEMA: TableSchema = [
    new TableColumn({
        def: 'id', header: 'Id', type: TableColumnTypes.Id, visible: true
    }),
    new TableColumn({
        def: 'name', header: 'Name', type: TableColumnTypes.Text, visible: true
    })
    // new TableColumn({
    //     def: 'actions', header: 'Actions', type: TableColumnTypes.Actions, visible: true
    // })
];

@Injectable()
export class TableService implements OnDestroy {

    private schema$: BehaviorSubject<TableSchema> = new BehaviorSubject(TABLE_SCHEMA);

    getTableSchema(): Observable<TableSchema> {
        return this.schema$.asObservable();
    }

    setTableSchema(schema: TableSchema): void {
        this.schema$.next(schema);
    }

    createColumn(column: TableColumn): void {
        this.schema$.next([ ...this.schema$.getValue(), column ]);
    }

    updateColumn(column: TableColumn): void {

    }

    ngOnDestroy() {
        this.schema$.complete();
    }

}
