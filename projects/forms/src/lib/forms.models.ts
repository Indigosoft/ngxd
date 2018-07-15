import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

function _find(control: AbstractControlSchema, path: Array<string | number> | string, delimiter: string) {
    if (path == null) {
        return null;
    }

    if (!(path instanceof Array)) {
        path = (<string>path).split(delimiter);
    }

    if (path instanceof Array && (path.length === 0)) { return null; }

    return (<Array<string | number>>path).reduce((v: AbstractControlSchema, name) => {
        if (v instanceof FormGroupSchema) {
            return v.controls.hasOwnProperty(name as string) ? v.controls[ name ] : null;
        }

        if (v instanceof FormArraySchema) {
            return v.at(<number>name) || null;
        }

        return null;
    }, control);
}

export abstract class AbstractControlSchema {

    key: string;
    label: string;
    disabled: boolean;
    schema: AbstractControlSchema;

    protected constructor(schema: Partial<AbstractControlSchema>) {
        this.key = schema.key;
        this.label = schema.label;
        this.disabled = schema.disabled;
        this.schema = schema as AbstractControlSchema;
    }

    enable() {
        this.disabled = false;
        this.schema.disabled = false;
    }

}

export class FormControlSchema extends AbstractControlSchema {

    formState: any;
    validator?: ValidatorFn | ValidatorFn[] | null;
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;

    constructor(
        schema: Partial<FormControlSchema>,
        formState?: any,
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(schema);

        this.formState = schema && schema.formState || formState;
        this.validator = schema && schema.validator || validator;
        this.asyncValidator = schema && schema.asyncValidator || asyncValidator;
    }

}

export class FormGroupSchema extends AbstractControlSchema {

    controls: { [ key: string ]: AbstractControlSchema; };
    validator?: ValidatorFn | ValidatorFn[] | null;
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;

    constructor(
        schema: Partial<FormGroupSchema>,
        controls: { [ key: string ]: AbstractControlSchema; },
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(schema);

        this.controls = schema && schema.controls || controls;
        this.validator = schema && schema.validator || validator;
        this.asyncValidator = schema && schema.asyncValidator || asyncValidator;
    }

    get(path: Array<string | number> | string): AbstractControlSchema {
        return _find(this, path, '.');
    }

}

export class FormArraySchema extends AbstractControlSchema {

    controls: AbstractControlSchema[];
    validator?: ValidatorFn | ValidatorFn[] | null;
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;

    constructor(
        schema: Partial<FormArraySchema>,
        controls: AbstractControlSchema[],
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(schema);

        this.controls = schema && schema.controls || controls;
        this.validator = schema && schema.validator || validator;
        this.asyncValidator = schema && schema.asyncValidator || asyncValidator;
    }

    push(control: AbstractControlSchema): void {
        this.controls.push(control);
    }

    at(index: number): AbstractControlSchema {
        return this.controls[ index ];
    }

}
