import { Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { TableSchema } from '@app/components/table';
import { CheckboxControl, DropdownControl, DropdownControlOptions, TextboxControl } from '@app/components/form';
import { TableColumn, TableColumnTypes } from '@app/dynamics';
import { AbstractControlSchema, FormArraySchema, FormGroupSchema, FormSchemaBuilder } from '@ngxd/forms';

@Injectable()
export class TableSchemaBuilder {

    constructor(private fsb: FormSchemaBuilder) {}

    form(formSchema: AbstractControlSchema): AbstractControl {
        return this.fsb.form(formSchema);
    }

    formSchema(schema: TableSchema): FormArraySchema {
        return this.fsb.array({ label: 'Table Schema' }, schema.map(
            (column) => this.groupSchema(column)
        ));
    }

    groupSchema(column: TableColumn): FormGroupSchema {
        return this.fsb.group({ key: column.def, label: column.header }, {
            def: new TextboxControl({
                key: 'def', label: 'Column Def', type: 'text', disabled: !column.editable,
                validator: [ Validators.required ]
            }),
            header: new TextboxControl({
                key: 'header', label: 'Header', type: 'text',
                validator: [ Validators.required, Validators.minLength(2) ]
            }),
            type: new DropdownControl({
                key: 'type', label: 'Type',
                options: TableColumnTypes.getTypes().map(({ key, value }) =>
                    new DropdownControlOptions({ key, value })
                ), validator: [ Validators.required ]
            }),
            visible: new CheckboxControl({ key: 'visible', label: 'Visible' }),
            editable: new CheckboxControl({ key: 'editable', label: 'Editable' })
        });
    }
}
