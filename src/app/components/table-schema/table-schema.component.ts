import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../table-columns';
import { TableSchema } from './TableSchema';

@Component({
    selector: 'app-table-schema',
    templateUrl: 'table-schema.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSchemaComponent {
    @Input() schema: TableSchema;
    @Output() schemaChange: EventEmitter<TableSchema> = new EventEmitter<TableSchema>();

    onTableColumnChange(name: string, column: TableColumn) {
        const schema: TableSchema = this.schema.map((item) => item.def === column.def ? column : item);

        this.schemaChange.emit(schema);
    }

    trackById(index, column: TableColumn) {
        return column.def;
    }
}
