import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideControl } from '../control.provider';
import { TextboxControl } from './TextboxControl';

@Component({
    selector: 'app-textbox-control',
    templateUrl: 'textbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextboxControlComponent {
    @Input() control: TextboxControl;
    @Input() form: FormGroup;
}

export const COMPONENTS = [ TextboxControlComponent ];
export const PROVIDERS = provideControl(TextboxControl, TextboxControlComponent);
