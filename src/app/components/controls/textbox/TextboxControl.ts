import { ControlBase } from '../ControlBase';

export class TextboxControl extends ControlBase {
    type: string;

    constructor({ type, ...args }: Partial<TextboxControl>) {
        super(args);
        this.type = type;
    }
}
