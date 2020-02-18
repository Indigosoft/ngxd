import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicEntityObject } from '@app/dynamics';
import { AbstractControlSchema } from '@ngxd/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntitySchemaService } from './entity-schema.service';

@Component({
  selector: 'app-entity-schema',
  templateUrl: 'entity-schema.component.html',
  styleUrls: ['entity-schema.component.scss'],
  providers: [EntitySchemaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitySchemaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() schema: DynamicEntityObject;
  @Output() invalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() schemaChange: EventEmitter<DynamicEntityObject> = new EventEmitter<
    DynamicEntityObject
  >();

  form$: Observable<AbstractControl> = this.service.getForm();
  formSchema$: Observable<AbstractControlSchema> = this.service.getFormSchema();

  private formValue$: Observable<DynamicEntityObject> = this.service.getFormValue();
  private formIsInvalid$: Observable<boolean> = this.service.getFormIsInvalid();
  private ngOnDestroy$: Subject<null> = new Subject<null>();

  constructor(private service: EntitySchemaService) {}

  ngOnInit() {
    this.formValue$.pipe(takeUntil(this.ngOnDestroy$)).subscribe(this.schemaChange);
    this.formIsInvalid$.pipe(takeUntil(this.ngOnDestroy$)).subscribe(this.invalid);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.schema) {
      this.service.createForm(this.schema);
    }
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
