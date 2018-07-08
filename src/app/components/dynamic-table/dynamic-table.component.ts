import { DataSource } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../table-columns';

@Component({
    selector: 'app-dynamic-table',
    templateUrl: 'dynamic-table.component.html',
    styleUrls: [ 'dynamic-table.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent {
    @Input() schema: TableColumn[];
    @Input() dataSource: DataSource<any>;

    @Output() action: EventEmitter<any> = new EventEmitter<any>();

    get displayedColumns(): string[] {
        return this.schema.map(({ def }) => def);
    }

    trackById(index, column: TableColumn): string {
        return column.def;
    }
}
