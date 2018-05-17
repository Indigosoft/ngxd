import { DataSource } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EntitiesService, EntityObject } from '../../components/entities';
import { TableColumn, TableColumnTypes } from '../../components/table';

class EntitiesDataSource extends DataSource<EntityObject> {
    constructor(private source: Observable<EntityObject[]>) { super(); }

    connect(): Observable<EntityObject[]> {
        return this.source;
    }

    disconnect(): void {}
}

const DISPLAYED_COLUMNS = [ 'id', 'name', 'icon' ];

const COLUMNS: TableColumn[] = [
    { def: 'id', header: 'Id', type: TableColumnTypes.Id },
    { def: 'name', header: 'Name', type: TableColumnTypes.Text },
    { def: 'icon', header: 'Image', type: TableColumnTypes.Icon }
];

@Component({
    selector: 'app-table-page',
    templateUrl: 'table.component.html',
    styleUrls: [ 'table.component.scss' ]
})
export class TablePageComponent {
    columns: TableColumn[] = COLUMNS;
    dataSource: DataSource<any> = new EntitiesDataSource(this.entityDataService.getFlattenEntities());
    displayedColumns: string[] = DISPLAYED_COLUMNS;

    constructor(private entityDataService: EntitiesService) {}

}
