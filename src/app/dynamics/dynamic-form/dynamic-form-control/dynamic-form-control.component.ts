import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

import { FormControlComponentResolver } from './dynamic-form-control.resolver';

@Component({
    selector: 'app-dynamic-form-control-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormControlHostComponent {
    @Input() control: FormControl;
    @Input() schema: FormControlSchema;
}

@Component({
    selector: 'app-dynamic-form-control',
    templateUrl: 'dynamic-form-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormControlComponent {

    @Input() control: FormControl;
    @Input() schema: FormControlSchema;

    constructor(public resolver: FormControlComponentResolver) {}

}
