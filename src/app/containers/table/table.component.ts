import { DataSource } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicEntitiesService } from '../../components/dynamic-entities';
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

    defaultSchema = [ ...TABLE_SCHEMA ];
    schema: TableSchema = [];
    dataSource: DataSource<any> = this.builder.build(this.service.getFlattenEntities());

    constructor(private builder: TableDataSourceBuilder, private service: DynamicEntitiesService) {}

    createColumn() {
        this.schema = [
            ...this.schema, ...this.defaultSchema.splice(0, 1)
        ];
    }

    deleteColumn() {
        const [ head, ...tail ] = this.schema;

        if (!head) {
            return;
        }

        this.schema = tail;
        this.defaultSchema = [ head, ...this.defaultSchema ];
    }

    createEntity() {
        this.service.createEntity();
    }

    deleteEntity() {
        this.service.deleteEntity();
    }

}
