import { FormControlSchema } from '@ngxd/forms';

export class TextboxControl extends FormControlSchema {
  type: string;

  constructor({ type, ...args }: Partial<TextboxControl>, ...config) {
    super(args, ...config);
    this.type = type;
  }
}
