import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideControl } from '../../../dynamic-form';
import { TextboxControl } from './TextboxControl';

@Component({
    selector: 'app-textbox-control',
    templateUrl: 'textbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextboxControlComponent {
    @Input() control: FormControl;
    @Input() schema: TextboxControl;
}

export const COMPONENT = TextboxControlComponent;
export const PROVIDERS = provideControl(TextboxControl, TextboxControlComponent);
