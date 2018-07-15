import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { AbstractControlSchema, FormArraySchema } from '@ngxd/forms';
import { BehaviorSubject, concat, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TableSchemaBuilder } from './table-schema.builder';
import { TableSchema } from '@app/components/table/TableSchema';

@Injectable()
export class TableSchemaService implements OnDestroy {

    private form$: BehaviorSubject<AbstractControl> = new BehaviorSubject<AbstractControl>(null);
    private formSchema$: BehaviorSubject<AbstractControlSchema> = new BehaviorSubject<AbstractControlSchema>(null);

    constructor(private builder: TableSchemaBuilder) {}

    getForm(): Observable<AbstractControl> {
        return this.form$.asObservable();
    }

    getFormSchema(): Observable<AbstractControlSchema> {
        return this.formSchema$.asObservable();
    }

    getFormRawValue(): Observable<TableSchema> {
        return this.getForm().pipe(
            switchMap(this.extractValue)
        );
    }

    getFormIsInvalid(): Observable<boolean> {
        return this.getForm().pipe(
            switchMap(this.extractFormIsInvalid)
        );
    }

    createForm(schema: TableSchema): void {
        const formSchema: FormArraySchema = this.builder.formSchema(schema);
        const form: AbstractControl = this.builder.form(formSchema);
        form.patchValue(schema);
        form.markAsDirty();

        this.formSchema$.next(formSchema);
        this.form$.next(form);
    }

    ngOnDestroy() {
        this.form$.complete();
        this.formSchema$.complete();
    }

    private extractValue(form: AbstractControl): Observable<TableSchema> {
        return form.valueChanges.pipe(
            map(() => (<FormArray>form).getRawValue())
        );
    }

    private extractFormIsInvalid(form: AbstractControl): Observable<boolean> {
        return concat(
            of(form.invalid),
            form.valueChanges.pipe(map(() => form.invalid))
        );
    }

}
