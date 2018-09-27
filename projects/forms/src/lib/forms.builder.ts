import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidatorFn } from '@angular/forms';
import { AbstractControlSchema, FormArraySchema, FormControlSchema, FormGroupSchema } from './forms.models';

@Injectable()
export class FormSchemaBuilder {

    constructor(private fb: FormBuilder) {}

    group(
        schema: Partial<AbstractControlSchema>,
        controlsConfig: { [ p: string ]: any },
        extra?: { [ p: string ]: any } | null
    ): FormGroupSchema {
        const controls = this._reduceControls(controlsConfig);
        const validator: ValidatorFn = extra != null ? extra[ 'validator' ] : null;
        const asyncValidator: AsyncValidatorFn = extra != null ? extra[ 'asyncValidator' ] : null;

        return new FormGroupSchema(schema, controls, validator, asyncValidator);
    }

    control(
        schema: AbstractControlSchema,
        formState: any,
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ): FormControlSchema {
        return new FormControlSchema(schema, formState, validator, asyncValidator);
    }

    array(
        schema: Partial<AbstractControlSchema>,
        controlsConfig: any[],
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ): FormArraySchema {
        const controls = controlsConfig.map(c => this._createControl(c));
        return new FormArraySchema(schema, controls, validator, asyncValidator);
    }

    form(schema: AbstractControlSchema): AbstractControl {
        const form: AbstractControl = this._createForm(schema);

        this._applyDisabled(form, schema);

        return form;
    }

    private _applyDisabled(form: AbstractControl, schema: AbstractControlSchema) {
        if (form.enabled && schema.disabled) {
            form.disable({ emitEvent: false, onlySelf: true });
        }

        if (form.disabled && !schema.disabled) {
            form.enable({ emitEvent: false, onlySelf: true });
        }
    }

    private _createForm(schema: AbstractControlSchema) {
        if (schema instanceof FormControlSchema) {
            return this.fb.control(schema.formState, schema.validator, schema.asyncValidator);
        }

        if (schema instanceof FormGroupSchema) {
            return this.fb.group(this._reduceForm(schema), {
                validator: schema.validator, asyncValidator: schema.asyncValidator
            });
        }

        if (schema instanceof FormArraySchema) {
            return this.fb.array(this._mapForm(schema), schema.validator, schema.asyncValidator);
        }
    }

    private _reduceControls(controlsConfig: { [ k: string ]: any }): { [ key: string ]: AbstractControlSchema } {
        const controls: { [ key: string ]: AbstractControlSchema } = {};
        Object.keys(controlsConfig).forEach(controlName => {
            controls[ controlName ] = this._createControl(controlsConfig[ controlName ]);
        });
        return controls;
    }

    private _createControl(controlConfig: any): AbstractControlSchema {
        if (this._isFormSchema(controlConfig)) {
            return controlConfig;
        }

        if (Array.isArray(controlConfig)) {
            const [ schema, value, validator, asyncValidator ] = controlConfig;

            return this.control(schema, value, validator, asyncValidator);
        }

        return this.control(controlConfig, null);
    }

    private _isFormSchema(controlConfig: any) {
        return controlConfig instanceof FormControlSchema
            || controlConfig instanceof FormGroupSchema
            || controlConfig instanceof FormArraySchema;
    }

    private _mapForm(schema: FormArraySchema): AbstractControl[] {
        return schema.controls.map((control) => this.form(control));
    }

    private _reduceForm(schema: FormGroupSchema): { [ key: string ]: AbstractControl } {
        const controls: { [ key: string ]: AbstractControl } = {};
        Object.keys(schema.controls).forEach((key) =>
            controls[ key ] = this.form(schema.controls[ key ])
        );
        return controls;
    }

}
