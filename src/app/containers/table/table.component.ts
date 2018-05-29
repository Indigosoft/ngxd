import { DataSource } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntitiesService } from '../../components/entities';
import { TableColumn, TableColumnTypes } from '../../components/table-columns';
import { TableSchema } from '../../components/table-schema';
import { TableDataSourceBuilder } from './table.datasource';

const TABLE_SCHEMA: TableSchema = [
    new TableColumn({
        def: 'id', header: 'Id', type: TableColumnTypes.Id
    }),
    new TableColumn({
        def: 'name', header: 'Name', type: TableColumnTypes.Text
    }),
    new TableColumn({
        def: 'icon', header: 'Image', type: TableColumnTypes.Icon
    })
];

@Component({
    selector: 'app-table-page',
    templateUrl: 'table.component.html',
    styleUrls: [ 'table.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent {

    schema: TableSchema = TABLE_SCHEMA;
    dataSource: DataSource<any> = this.builder.build(this.service.getFlattenEntities());

    constructor(private builder: TableDataSourceBuilder, private service: EntitiesService) {}

}
