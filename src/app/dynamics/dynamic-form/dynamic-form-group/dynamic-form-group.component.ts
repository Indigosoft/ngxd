import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DynamicFormGroupComponentBase } from './dynamic-form-group.base';
import { FormGroupComponentResolver } from './dynamic-form-group.resolver';

@Component({
    selector: 'app-dynamic-form-group',
    templateUrl: 'dynamic-form-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormGroupComponent extends DynamicFormGroupComponentBase {

    constructor(public resolver: FormGroupComponentResolver) {
        super();
    }

}
