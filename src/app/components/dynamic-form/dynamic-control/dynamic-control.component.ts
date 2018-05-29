import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlSchema } from '@ngxd/forms';

import { ControlComponentResolver } from '../../controls';

@Component({
    selector: 'app-dynamic-control-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicControlHostComponent {
    @Input() control: FormControl;
    @Input() schema: FormControlSchema;
}

@Component({
    selector: 'app-dynamic-control',
    templateUrl: 'dynamic-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicControlComponent {

    @Input() control: FormControl;
    @Input() schema: FormControlSchema;

    constructor(public resolver: ControlComponentResolver) {}

}
