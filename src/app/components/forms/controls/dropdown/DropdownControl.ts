import { FormControlSchema } from '@ngxd/forms';

export class DropdownControlOptions {
    key: string;
    value: any;

    constructor({ key, value }: Partial<DropdownControlOptions>) {
        this.key = key;
        this.value = value;
    }
}

export class DropdownControl extends FormControlSchema {
    options: DropdownControlOptions[] = [];

    constructor({ options, ...args }: Partial<DropdownControl>, ...config) {
        super(args, ...config);
        this.options = options;
    }
}
