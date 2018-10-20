import { Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArraySchema } from '@ngxd/forms';

export class DynamicFormArrayComponentBase {
    @Input() array: FormArray;
    @Input() schema: FormArraySchema;
}
