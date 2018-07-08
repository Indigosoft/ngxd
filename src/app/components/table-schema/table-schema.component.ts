import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { AbstractControlSchema } from '@ngxd/forms';
import { ReplaySubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSchemaService } from './table-schema.service';
import { TableSchema } from './TableSchema';

@Component({
    selector: 'app-table-schema',
    templateUrl: 'table-schema.component.html',
    styleUrls: [ 'table-schema.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSchemaComponent implements OnChanges, OnDestroy {
    @Input() schema: TableSchema;
    @Output() schemaChange: EventEmitter<TableSchema> = new EventEmitter<TableSchema>();

    form: AbstractControl;
    formSchema: AbstractControlSchema;

    private ngOnDestroy$: ReplaySubject<null> = new ReplaySubject<null>();

    private subscription: Subscription;

    constructor(private service: TableSchemaService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.schema && this.schema) {
            this.formSchema = this.service.createFormSchema(this.schema);
            this.form = this.service.createForm(this.formSchema);
            this.form.patchValue(this.schema);

            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = null;
            }

            this.subscription = this.form.valueChanges.pipe(
                map(() => (this.form as FormArray).getRawValue())
            ).subscribe(this.schemaChange);
            // this.service.updateForm(this.form, this.formSchema, this.schema);
        }
    }

    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();

        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

}
