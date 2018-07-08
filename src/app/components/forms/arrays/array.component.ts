import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArraySchema } from '@ngxd/forms';
import { provideFormArray } from '../../dynamic-form';

@Component({
    selector: 'app-form-array',
    templateUrl: 'array.component.html',
    styleUrls: [ 'array.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormArrayComponent {

    @Input() array: FormArray;
    @Input() schema: FormArraySchema;

    trackByIndex(index): string {
        return String(index);
    }

}

export const COMPONENT = FormArrayComponent;
export const PROVIDERS = [ provideFormArray(FormArraySchema, FormArrayComponent) ];
