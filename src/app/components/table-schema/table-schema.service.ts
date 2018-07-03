import { Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { AbstractControlSchema, FormGroupSchema, FormSchemaBuilder } from '@ngxd/forms';
import { DropdownControl, DropdownControlOptions, TextboxControl } from '../forms/controls';
import { TableColumnTypes } from '../table-columns';
import { TableSchema } from './TableSchema';

@Injectable()
export class TableSchemaService {

    constructor(private fsb: FormSchemaBuilder) {}

    createForm(formSchema: AbstractControlSchema): AbstractControl {
        return this.fsb.form(formSchema);
    }

    createFormSchema(schema: TableSchema): AbstractControlSchema {
        const columns: FormGroupSchema[] = schema.map((column) =>
            this.fsb.group({ key: column.def, label: column.header }, {
                def: new TextboxControl({
                    key: 'def', label: 'Column Def', type: 'text', disabled: true,
                    validator: [ Validators.required ]
                }),
                header: new TextboxControl({
                    key: 'header', label: 'Header', type: 'text',
                    validator: [ Validators.required, Validators.minLength(2) ]
                }),
                type: new DropdownControl({
                    key: 'type', label: 'Type', options: [
                        new DropdownControlOptions({ key: 'Id', value: TableColumnTypes.Id }),
                        new DropdownControlOptions({ key: 'Icon', value: TableColumnTypes.Icon }),
                        new DropdownControlOptions({ key: 'Text', value: TableColumnTypes.Text })
                    ], validator: [ Validators.required ]
                })
            })
        );

        return this.fsb.array({ label: 'Table Schema' }, columns);
    }

}
