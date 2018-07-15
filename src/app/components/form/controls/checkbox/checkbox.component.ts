import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideControl } from '@app/dynamics/dynamic-form';
import { CheckboxControl } from './CheckboxControl';

@Component({
    selector: 'app-checkobox-control',
    templateUrl: 'checkbox.component.html',
    styleUrls: [ 'checkbox.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextboxControlComponent {
    @Input() control: FormControl;
    @Input() schema: CheckboxControl;
}

export const COMPONENT = TextboxControlComponent;
export const PROVIDERS = provideControl(CheckboxControl, TextboxControlComponent);
