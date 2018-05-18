import { DataSource } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntitiesService, EntityObject } from '../../components/entities';
import { TableColumn, TableColumnTypes } from '../../components/table-columns';
import { TableSchema } from '../../components/table-schema';

class EntitiesDataSource extends DataSource<EntityObject> {
    constructor(private source: Observable<EntityObject[]>) { super(); }

    connect(): Observable<EntityObject[]> {
        return this.source;
    }

    disconnect(): void {}
}

const DISPLAYED_COLUMNS = [ 'id', 'name', 'icon' ];

const TABLE_SCHEMA: TableSchema = [
    new TableColumn({ def: 'id', header: 'Id', type: TableColumnTypes.Id }),
    new TableColumn({ def: 'name', header: 'Name', type: TableColumnTypes.Text }),
    new TableColumn({ def: 'icon', header: 'Image', type: TableColumnTypes.Icon })
];

@Component({
    selector: 'app-table-page',
    templateUrl: 'table.component.html',
    styleUrls: [ 'table.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent {

    schema$: BehaviorSubject<TableSchema> = new BehaviorSubject<TableSchema>(TABLE_SCHEMA);
    dataSource: DataSource<any> = new EntitiesDataSource(this.entityDataService.getFlattenEntities());
    displayedColumns: string[] = DISPLAYED_COLUMNS;

    constructor(private entityDataService: EntitiesService) {}

    onSchemaChanged(schema) {
        this.schema$.next(schema);
    }

}
