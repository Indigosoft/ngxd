import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { provideControl } from '../control.provider';
import { DropdownControl } from './DropdownControl';

@Component({
    selector: 'app-dropdown-control',
    templateUrl: 'dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownControlComponent {
    @Input() control: DropdownControl;
    @Input() form: AbstractControl;
}

export const COMPONENTS = [ DropdownControlComponent ];
export const PROVIDERS = provideControl(DropdownControl, DropdownControlComponent);
