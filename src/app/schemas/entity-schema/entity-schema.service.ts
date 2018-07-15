import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AbstractControlSchema, FormGroupSchema } from '@ngxd/forms';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Hero } from '@app/components/entities';
import { EntitySchemaBuilder } from './entity-schema.builder';

@Injectable()
export class EntitySchemaService implements OnDestroy {

    private form$: BehaviorSubject<AbstractControl> = new BehaviorSubject<AbstractControl>(null);
    private formSchema$: BehaviorSubject<AbstractControlSchema> = new BehaviorSubject<AbstractControlSchema>(null);

    constructor(private builder: EntitySchemaBuilder) {}

    getForm(): Observable<AbstractControl> {
        return this.form$.asObservable();
    }

    getFormSchema(): Observable<AbstractControlSchema> {
        return this.formSchema$.asObservable();
    }

    getFormRawValue(): Observable<Hero> {
        return this.getForm().pipe(
            switchMap(this.extractValue)
        );
    }

    getFormIsInvalid(): Observable<boolean> {
        return this.getForm().pipe(
            switchMap(this.extractFormIsInvalid)
        );
    }

    createForm(schema: Hero): void {
        const formSchema: FormGroupSchema = this.builder.formSchema(schema);
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

    private extractValue(form: AbstractControl): Observable<Hero> {
        return form.valueChanges.pipe(
            map(() => new Hero((<FormGroup>form).getRawValue()))
        );
    }

    private extractFormIsInvalid(form: AbstractControl): Observable<boolean> {
        return merge(
            of(form.invalid),
            form.valueChanges.pipe(map(() => form.invalid))
        );
    }

}
