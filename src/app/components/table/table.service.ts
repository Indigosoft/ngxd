import { Injectable, OnDestroy } from '@angular/core';
import { TableColumn, TableColumnTypes } from '@app/dynamics';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableSchema } from './TableSchema';

const TABLE_SCHEMA: TableSchema = [
  new TableColumn({
    def: 'id',
    header: 'Id',
    type: TableColumnTypes.Id,
    visible: true,
    editable: true,
  }),
  new TableColumn({
    def: 'name',
    header: 'Name',
    type: TableColumnTypes.Text,
    visible: true,
    editable: true,
  }),
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
    this.schema$.next([...this.schema$.getValue(), column]);
  }

  ngOnDestroy() {
    this.schema$.complete();
  }
}
