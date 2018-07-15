import { Component } from '@angular/core';
import { TableColumn, TableSchema } from '@app/components/table';

@Component({
    selector: 'app-table-column-schema-modal',
    templateUrl: 'table-column-schema-modal.component.html'
})
export class TableColumnSchemaModalComponent {
    invalid: boolean;

    schema: TableSchema = [
        new TableColumn({
            def: null, header: null, type: null, visible: true, editable: true
        })
    ];
}
