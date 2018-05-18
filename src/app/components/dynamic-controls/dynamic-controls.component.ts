import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ControlBase } from '../controls';

@Component({
    selector: 'app-dynamic-controls',
    templateUrl: 'dynamic-controls.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicControlsComponent {

    @Input() controls: ControlBase[];
    @Output() controlsChange: EventEmitter<ControlBase[]> = new EventEmitter<ControlBase[]>();

    onControlChanged(name: string, control: ControlBase) {
        const controls: ControlBase[] = this.controls.map(
            (item) => item.key === control.key ? control : item);

        this.controlsChange.emit(controls);
    }

    trackById(index, control: ControlBase): string {
        return control.key;
    }

}
