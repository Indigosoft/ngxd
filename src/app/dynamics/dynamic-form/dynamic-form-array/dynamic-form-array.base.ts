import { Input, Directive } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArraySchema } from '@ngxd/forms';

@Directive()
export class DynamicFormArrayComponentBase {
    @Input() array: FormArray;
    @Input() schema: FormArraySchema;
}
