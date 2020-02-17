import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicFormControlComponentBase, provideControl } from '@app/dynamics';
import { DropdownControl } from './DropdownControl';

@Component({
  selector: 'app-dropdown-control',
  templateUrl: 'dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownControlComponent extends DynamicFormControlComponentBase {
  @Input() schema: DropdownControl;
}

export const COMPONENT = DropdownControlComponent;
export const PROVIDERS = provideControl(DropdownControl, DropdownControlComponent);
