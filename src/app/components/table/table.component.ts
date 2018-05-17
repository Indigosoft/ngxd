import { DataSource } from '@angular/cdk/table';
import { Component, Input } from '@angular/core';
import { TableColumn } from './TableColumn';

@Component({
    selector: 'app-table',
    templateUrl: 'table.component.html',
    styleUrls: [ 'table.component.scss' ]
})
export class TableComponent {
    @Input() columns: TableColumn[];
    @Input() dataSource: DataSource<any>;
    @Input() displayedColumns: string[];
}
