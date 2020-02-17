import { Input, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupSchema } from '@ngxd/forms';

@Directive()
export class DynamicFormGroupComponentBase {
    @Input() group: FormGroup;
    @Input() schema: FormGroupSchema;
}
