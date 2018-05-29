import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractControlSchema, FormArraySchema, FormControlSchema, FormGroupSchema } from '@ngxd/forms';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: 'dynamic-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {

    @Input() form: AbstractControl; // FormControl | FormGroup | FormArray
    @Input() schema: AbstractControlSchema; // FormControlSchema | FormGroupSchema | FormArraySchema

    toArray(object: {}) {
        return Object.keys(object).map((key) => object[key]);
    }

    isControl(schema: AbstractControlSchema): boolean {
        return schema instanceof FormControlSchema;
    }

    isGroup(schema: AbstractControlSchema): boolean {
        return schema instanceof FormGroupSchema;
    }

    isArray(schema: AbstractControlSchema): boolean {
        return schema instanceof FormArraySchema;
    }

    trackByKey(index, schema: AbstractControlSchema): string {
        return schema.key;
    }

    trackByIndex(index): string {
        return String(index);
    }

}
