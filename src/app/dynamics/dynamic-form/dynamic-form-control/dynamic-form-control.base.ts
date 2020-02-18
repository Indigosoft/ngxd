import { Input, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

@Directive() // tslint:disable-next-line:directive-class-suffix
export class DynamicFormControlComponentBase {
  @Input() control: FormControl;
  @Input() schema: FormControlSchema;
}
