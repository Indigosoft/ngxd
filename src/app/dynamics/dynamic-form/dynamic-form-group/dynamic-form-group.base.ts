import { Input, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupSchema } from '@ngxd/forms';

@Directive() // tslint:disable-next-line:directive-class-suffix
export class DynamicFormGroupComponentBase {
  @Input() group: FormGroup;
  @Input() schema: FormGroupSchema;
}
