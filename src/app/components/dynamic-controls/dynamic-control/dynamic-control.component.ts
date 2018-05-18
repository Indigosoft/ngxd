import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { ControlBase, ControlComponentResolver } from '../../controls';

@Component({
    selector: 'app-dynamic-control-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicControlHostComponent {
    @Input() control: ControlBase;
    @Input() form: FormGroup;
}

@Component({
    selector: 'app-dynamic-control',
    templateUrl: 'dynamic-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicControlComponent implements OnInit, OnChanges, OnDestroy {

    @Input() control: ControlBase;
    @Output() controlChange: EventEmitter<ControlBase> = new EventEmitter<ControlBase>();

    form: FormGroup = this.fb.group({});

    private ngOnDestroy$: ReplaySubject<null> = new ReplaySubject<null>();

    constructor(public resolver: ControlComponentResolver, private fb: FormBuilder) {}

    ngOnInit() {
        this.form.valueChanges.pipe(
            filter((values) => values && typeof values[ this.control.key ] !== 'undefined'),
            map((values) => values[ this.control.key ]),
            takeUntil(this.ngOnDestroy$)
        ).subscribe((value) => {
            this.control.value = value;
            this.controlChange.emit(this.control);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.control && changes.control.currentValue) {
            if (this.form.get(this.control.key)) {
                if (this.form.controls[ this.control.key ] !== this.control.value) {
                    this.form.patchValue({ [ this.control.key ]: this.control.value }, { emitEvent: false });
                }
            } else {
                for (const name in this.form.controls) {
                    this.form.removeControl(name);
                }

                this.form.addControl(this.control.key, this.fb.control(this.control.value));
            }

            if (this.form.enabled && this.control.disabled) {
                this.form.disable({ emitEvent: false });
            }

            if (this.form.disabled && !this.control.disabled) {
                this.form.enable({ emitEvent: false });
            }
        }
    }

    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();
    }

}
