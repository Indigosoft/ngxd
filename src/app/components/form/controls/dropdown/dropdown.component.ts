import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideControl } from '@app/dynamics/dynamic-form';
import { DropdownControl } from './DropdownControl';

@Component({
    selector: 'app-dropdown-control',
    templateUrl: 'dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownControlComponent {
    @Input() control: FormControl;
    @Input() schema: DropdownControl;
}

export const COMPONENT = DropdownControlComponent;
export const PROVIDERS = provideControl(DropdownControl, DropdownControlComponent);
