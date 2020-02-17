import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicFormControlComponentBase, provideControl } from '@app/dynamics';
import { TextboxControl } from './TextboxControl';

@Component({
  selector: 'app-textbox-control',
  templateUrl: 'textbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextboxControlComponent extends DynamicFormControlComponentBase {
  @Input() schema: TextboxControl;
}

export const COMPONENT = TextboxControlComponent;
export const PROVIDERS = provideControl(TextboxControl, TextboxControlComponent);
