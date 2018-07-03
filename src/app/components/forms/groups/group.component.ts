import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractControlSchema, FormGroupSchema } from '@ngxd/forms';
import { provideFormGroup } from '../../dynamic-form';

@Component({
    selector: 'app-form-group',
    templateUrl: 'group.component.html'
})
export class FormGroupComponent {

    @Input() group: FormGroup;
    @Input() schema: FormGroupSchema;

    toArray(object: {}) {
        return Object.keys(object).map((key) => object[key]);
    }

    trackByKey(index, schema: AbstractControlSchema): string {
        return schema.key;
    }

}

export const COMPONENTS = [ FormGroupComponent ];
export const PROVIDERS = [ provideFormGroup(FormGroupSchema, FormGroupComponent) ];
