import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractControlSchema } from '@ngxd/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hero } from '@app/components/entities';
import { EntitySchemaService } from './entity-schema.service';

@Component({
    selector: 'app-entity-schema',
    templateUrl: 'entity-schema.component.html',
    styleUrls: [ 'entity-schema.component.scss' ],
    providers: [ EntitySchemaService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitySchemaComponent implements OnInit, OnChanges, OnDestroy {
    @Input() schema: Hero;
    @Output() invalid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() schemaChange: EventEmitter<Hero> = new EventEmitter<Hero>();

    form$: Observable<AbstractControl> = this.service.getForm();
    formSchema$: Observable<AbstractControlSchema> = this.service.getFormSchema();

    private formRawValue$: Observable<Hero> = this.service.getFormRawValue();
    private formIsInvalid$: Observable<boolean> = this.service.getFormIsInvalid();
    private ngOnDestroy$: Subject<null> = new Subject<null>();

    constructor(private service: EntitySchemaService) {}

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
