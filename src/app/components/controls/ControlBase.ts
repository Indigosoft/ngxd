import { AbstractControlSchema } from '@ngxd/forms';

export abstract class ControlBase extends AbstractControlSchema {
    key: string;
    label: string;
    disabled: boolean;

    protected constructor(schema: Partial<ControlBase>) {
        super(schema);
    }
}
