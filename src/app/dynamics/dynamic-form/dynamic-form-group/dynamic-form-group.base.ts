import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupSchema } from '@ngxd/forms';

export class DynamicFormGroupComponentBase {
    @Input() group: FormGroup;
    @Input() schema: FormGroupSchema;
}
