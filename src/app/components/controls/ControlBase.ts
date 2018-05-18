export abstract class ControlBase {
    value: any;
    key: string;
    label: string;
    disabled: boolean;

    protected constructor({ value, key, label, disabled }: Partial<ControlBase>) {
        this.value = value;
        this.key = key;
        this.label = label;
        this.disabled = disabled;
    }
}
