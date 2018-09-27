import { DataSource } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TableColumn } from '@app/components/table';

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
        return this.schema
                   .filter(({ def }) => def)
                   .filter(({ visible }) => visible)
                   .map(({ def }) => def);
    }

    trackById(index, column: TableColumn): string {
        return column.def;
    }
}
