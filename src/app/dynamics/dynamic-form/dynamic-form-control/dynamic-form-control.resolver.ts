import { Inject, Injectable, Type } from '@angular/core';
import { NgxdResolver } from '@ngxd/core';
import { FormControlSchema } from '@ngxd/forms';

import { DynamicFormControlComponentBase } from './dynamic-form-control.base';
import { FORM_CONTROL_PROVIDER, FormControlProvider } from './dynamic-form-control.provider';

@Injectable()
export class FormControlComponentResolver extends NgxdResolver<
  Type<FormControlSchema>,
  Type<DynamicFormControlComponentBase>
> {
  constructor(@Inject(FORM_CONTROL_PROVIDER) providers: FormControlProvider[]) {
    super(providers);
  }
}
