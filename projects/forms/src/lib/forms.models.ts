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
    validator: ValidatorFn | ValidatorFn[] | null;
    asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null;

    constructor(
        schema: Partial<AbstractControlSchema>,
        formState?: any,
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(schema);

        this.formState = formState;
        this.validator = validator;
        this.asyncValidator = asyncValidator;
    }

}

export class FormGroupSchema extends AbstractControlSchema {

    controls: { [ key: string ]: AbstractControlSchema; };
    validator?: ValidatorFn | ValidatorFn[] | null;
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;

    constructor(
        schema: Partial<AbstractControlSchema>,
        controls: { [ key: string ]: AbstractControlSchema; },
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(schema);

        this.controls = controls;
        this.validator = validator;
        this.asyncValidator = asyncValidator;
    }

}

export class FormArraySchema extends AbstractControlSchema {

    controls: AbstractControlSchema[];
    validator?: ValidatorFn | ValidatorFn[] | null;
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;

    constructor(
        schema: Partial<AbstractControlSchema>,
        controls: AbstractControlSchema[],
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(schema);

        this.controls = controls;
        this.validator = validator;
        this.asyncValidator = asyncValidator;
    }

}
