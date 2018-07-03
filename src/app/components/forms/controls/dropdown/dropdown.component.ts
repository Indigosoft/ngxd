import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideControl } from '../../../dynamic-form';
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

export const COMPONENTS = [ DropdownControlComponent ];
export const PROVIDERS = provideControl(DropdownControl, DropdownControlComponent);
