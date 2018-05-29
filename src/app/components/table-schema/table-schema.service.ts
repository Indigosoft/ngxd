import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AbstractControlSchema, FormGroupSchema, FormSchemaBuilder } from '@ngxd/forms';
import { ControlBase, DropdownControl, DropdownControlOptions, TextboxControl } from '../controls';
import { TableColumnTypes } from '../table-columns';
import { TableSchema } from './TableSchema';

@Injectable()
export class TableSchemaService {

    constructor(
        private fb: FormBuilder,
        private fsb: FormSchemaBuilder
    ) {}

    createForm(formSchema: AbstractControlSchema): AbstractControl {
        return this.fsb.form(formSchema);
    }

    createFormSchema(schema: TableSchema): AbstractControlSchema {
        const columns: FormGroupSchema[] = schema.map((column) =>
            this.fsb.group({ key: column.def, label: column.header }, {
                def: new TextboxControl({
                    key: 'def', label: 'Column Def', type: 'text', disabled: true
                }),
                header: new TextboxControl({
                    key: 'header', label: 'Header', type: 'text'
                }),
                type: new DropdownControl({
                    key: 'type', label: 'Type', options: [
                        new DropdownControlOptions({ key: 'Id', value: TableColumnTypes.Id }),
                        new DropdownControlOptions({ key: 'Icon', value: TableColumnTypes.Icon }),
                        new DropdownControlOptions({ key: 'Text', value: TableColumnTypes.Text })
                    ]
                })
            })
        );

        return this.fsb.array({ label: 'Table Schema' }, columns);
    }

    // updateForm(form: FormGroup, formSchema: TableFormSchema, tableSchema: TableSchema) {
    //     for (const index in formSchema) {
    //         if (!form.contains(index)) {
    //             form.setControl(index, this.fb.group({
    //                 def: this.fb.control(''),
    //                 header: this.fb.control(''),
    //                 type: this.fb.control('')
    //             }));
    //         }
    //     }
    //
    //     for (const index in form.controls) {
    //         if (!formSchema.hasOwnProperty(index)) {
    //             form.removeControl(index);
    //         }
    //     }
    //
    //     for (const columnSchema of tableSchema) {
    //         if (form.contains(columnSchema.def)) {
    //             form.get(columnSchema.def).patchValue(columnSchema, { emitEvent: false });
    //         }
    //     }
    //
    //     for (const index in formSchema) {
    //         if (form.contains(index)) {
    //             this.updateAccessForm(form.get(index) as FormGroup, formSchema[ index ]);
    //         }
    //     }
    // }
    //
    // private updateAccessForm(form: FormGroup, formSchema: ControlBase[]) {
    //     for (const controlSchema of formSchema) {
    //         if (form.contains(controlSchema.key)) {
    //             const index = controlSchema.key;
    //
    //             if (form.get(index).enabled && controlSchema.disabled) {
    //                 form.get(index).disable({ emitEvent: false });
    //             }
    //
    //             if (form.get(index).disabled && !controlSchema.disabled) {
    //                 form.get(index).enable({ emitEvent: false });
    //             }
    //         }
    //     }
    // }

}
