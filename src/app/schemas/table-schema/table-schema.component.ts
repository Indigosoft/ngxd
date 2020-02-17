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
import { TableSchema } from '@app/components';
import { AbstractControlSchema } from '@ngxd/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableSchemaService } from './table-schema.service';

@Component({
  selector: 'app-table-schema',
  templateUrl: 'table-schema.component.html',
  styleUrls: ['table-schema.component.scss'],
  providers: [TableSchemaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSchemaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() schema: TableSchema;
  @Output() invalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() schemaChange: EventEmitter<TableSchema> = new EventEmitter<TableSchema>();

  form$: Observable<AbstractControl> = this.service.getForm();
  formSchema$: Observable<AbstractControlSchema> = this.service.getFormSchema();

  private formRawValue$: Observable<TableSchema> = this.service.getFormRawValue();
  private formIsInvalid$: Observable<boolean> = this.service.getFormIsInvalid();
  private ngOnDestroy$: Subject<null> = new Subject<null>();

  constructor(private service: TableSchemaService) {}

  ngOnInit() {
    this.formRawValue$.pipe(takeUntil(this.ngOnDestroy$)).subscribe(this.schemaChange);
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
