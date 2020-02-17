import { FormControlSchema } from '@ngxd/forms';

export class CheckboxControl extends FormControlSchema {
  constructor({ ...args }: Partial<CheckboxControl>, ...config) {
    super(args, ...config);
  }
}
