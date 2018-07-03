import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

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

}
