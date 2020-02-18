import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Hero } from '@app/components';
import { DynamicEntityObject } from '@app/dynamics';
import { AbstractControlSchema, FormSchemaBuilder } from '@ngxd/forms';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CompositeSchemaBuilder } from '../composite-schema';

@Injectable()
export class EntitySchemaService implements OnDestroy {
  private form$: BehaviorSubject<AbstractControl> = new BehaviorSubject<AbstractControl>(null);
  private formSchema$: BehaviorSubject<AbstractControlSchema> = new BehaviorSubject<
    AbstractControlSchema
  >(null);

  constructor(private fsb: FormSchemaBuilder, private builder: CompositeSchemaBuilder) {}

  getForm(): Observable<AbstractControl> {
    return this.form$.asObservable();
  }

  getFormSchema(): Observable<AbstractControlSchema> {
    return this.formSchema$.asObservable();
  }

  getFormValue(): Observable<Hero> {
    return combineLatest(this.getFormSchema(), this.getForm()).pipe(
      switchMap(([schema, form]) => this.extractValue(schema, form))
    );
  }

  getFormIsInvalid(): Observable<boolean> {
    return this.getForm().pipe(switchMap(this.extractFormIsInvalid));
  }

  createForm(schema: DynamicEntityObject): void {
    const formSchema: AbstractControlSchema = this.builder.schema(schema);
    const form: AbstractControl = this.fsb.form(formSchema);
    form.patchValue(schema);
    form.markAsDirty();

    this.formSchema$.next(formSchema);
    this.form$.next(form);
  }

  ngOnDestroy() {
    this.form$.complete();
    this.formSchema$.complete();
  }

  private extractValue(schema: AbstractControlSchema, form: AbstractControl): Observable<Hero> {
    return form.valueChanges.pipe(
      map(() => {
        const rawValue = (<FormGroup>form).getRawValue();

        return this.builder.extract(schema, rawValue);
      })
    );
  }

  private extractFormIsInvalid(form: AbstractControl): Observable<boolean> {
    return merge(of(form.invalid), form.valueChanges.pipe(map(() => form.invalid)));
  }
}
