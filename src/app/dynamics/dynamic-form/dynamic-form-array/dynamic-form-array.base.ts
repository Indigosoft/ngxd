import { Input, Directive } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArraySchema } from '@ngxd/forms';

@Directive() // tslint:disable-next-line:directive-class-suffix
export class DynamicFormArrayComponentBase {
  @Input() array: FormArray;
  @Input() schema: FormArraySchema;
}
