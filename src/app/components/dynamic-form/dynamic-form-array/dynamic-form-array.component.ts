import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArraySchema } from '@ngxd/forms';
import { FormArrayComponentResolver } from '../../forms/arrays';

@Component({
    selector: 'app-dynamic-form-array-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormArrayHostComponent {
    @Input() array: FormArray;
    @Input() schema: FormArraySchema;
}

@Component({
    selector: 'app-dynamic-form-array',
    templateUrl: 'dynamic-form-array.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormArrayComponent {

    @Input() array: FormArray;
    @Input() schema: FormArraySchema;

    constructor(public resolver: FormArrayComponentResolver) {}

}
