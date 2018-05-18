import { ChangeDetectionStrategy, Component, EventEmitter, Injectable, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlBase } from '../../controls';
import { DropdownControl, DropdownControlOptions } from '../../controls/dropdown/DropdownControl';
import { TextboxControl } from '../../controls/textbox/TextboxControl';
import { TableColumn, TableColumnTypes } from '../../table-columns';

@Injectable()
export class TableColumnSchemaService {

    convertColumn(column: TableColumn): ControlBase[] {
        return [
            new TextboxControl({
                key: 'def', label: 'Column Def', type: 'text', value: column.def, disabled: true
            }),
            new TextboxControl({
                key: 'header', label: 'Header', type: 'text', value: column.header
            }),
            new DropdownControl({
                key: 'type', label: 'Type', value: column.type, options: [
                    new DropdownControlOptions({ key: 'Id', value: TableColumnTypes.Id }),
                    new DropdownControlOptions({ key: 'Icon', value: TableColumnTypes.Icon }),
                    new DropdownControlOptions({ key: 'Text', value: TableColumnTypes.Text })
                ]
            })
        ];
    }

    extractColumn(controls: ControlBase[]): TableColumn {
        return controls.reduce((column, control) => {
            column[ control.key ] = control.value;
            return column;
        }, new TableColumn({}));
    }

}

@Component({
    selector: 'app-table-column-schema',
    templateUrl: 'column-schema.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnSchemaComponent implements OnChanges {

    @Input() column: TableColumn;
    @Output() columnChange: EventEmitter<TableColumn> = new EventEmitter<TableColumn>();

    controls: ControlBase[] = [];

    constructor(private service: TableColumnSchemaService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.column && changes.column.currentValue) {
            const column = changes.column.currentValue;
            this.controls = this.service.convertColumn(column);
        }
    }

    onControlsChanged(controls: ControlBase[]) {
        const column = this.service.extractColumn(controls);
        this.columnChange.emit(column);
    }

}
