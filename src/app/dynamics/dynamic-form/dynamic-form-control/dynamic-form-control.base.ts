import { Input, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

@Directive()
export class DynamicFormControlComponentBase {

    @Input() control: FormControl;
    @Input() schema: FormControlSchema;

}
