import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupSchema } from '@ngxd/forms';

import { FormGroupComponentResolver } from './dynamic-form-group.resolver';

@Component({
    selector: 'app-dynamic-form-group-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormGroupHostComponent {
    @Input() group: FormGroup;
    @Input() schema: FormGroupSchema;
}

@Component({
    selector: 'app-dynamic-form-group',
    templateUrl: 'dynamic-form-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormGroupComponent {

    @Input() group: FormGroup;
    @Input() schema: FormGroupSchema;

    constructor(public resolver: FormGroupComponentResolver) {}

}
