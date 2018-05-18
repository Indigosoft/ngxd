import { ControlBase } from '../ControlBase';

export class DropdownControlOptions {
    key: string;
    value: any;

    constructor({ key, value }: Partial<DropdownControlOptions>) {
        this.key = key;
        this.value = value;
    }
}

export class DropdownControl extends ControlBase {
    options: DropdownControlOptions[] = [];

    constructor({ options, ...args }: Partial<DropdownControl>) {
        super(args);
        this.options = options;
    }
}
