import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractControlSchema, FormGroupSchema } from '@ngxd/forms';
import { provideFormGroup } from '../../dynamic-form';

@Component({
    selector: 'app-form-group',
    templateUrl: 'group.component.html',
    styleUrls: [ 'group.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent {

    @Input() group: FormGroup;
    @Input() schema: FormGroupSchema;

    toArray<T>(object: { [key: string]: T }): T[] {
        return Object.keys(object).map((key) => object[key]);
    }

    trackByKey(index, schema: AbstractControlSchema): string {
        return schema.key;
    }

}

export const COMPONENT = FormGroupComponent;
export const PROVIDERS = [ provideFormGroup(FormGroupSchema, FormGroupComponent) ];
