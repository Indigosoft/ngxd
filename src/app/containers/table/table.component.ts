import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DynamicEntityObject } from '@app/dynamics/dynamic-entities';
import { EntitiesService } from '@app/components/entities';
import { EntitySchemaModalComponent } from '@app/schemas/entity-schema';
import { TableSchema, TableService } from '@app/components/table';
import { TableColumnSchemaModalComponent } from '@app/schemas/table-schema';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
    selector: 'app-table-page',
    templateUrl: 'table.component.html',
    styleUrls: [ 'table.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent {

    entities$: Observable<DynamicEntityObject[]> = this.entities.getFlattenEntities();
    schema$: Observable<TableSchema> = this.table.getTableSchema();

    constructor(
        private entities: EntitiesService,
        private table: TableService,
        private dialog: MatDialog
    ) {}

    onTableAction($event) {
        switch ($event.type) {
            case 'edit':
                return this.onEditEntity($event.data);
            case 'delete':
                return this.onDeleteEntity($event.data);
        }
    }

    onChangeTableSchema(schema: TableSchema): void {
        this.table.setTableSchema(schema);
    }

    onCreateColumn() {
        const dialogRef = this.dialog.open(TableColumnSchemaModalComponent, { width: '550px' });

        dialogRef.afterClosed().pipe(take(1), filter(_ => _))
                 .subscribe((createdColumn) => this.table.createColumn(createdColumn));
    }

    onCreateEntity() {
        const dialogRef = this.dialog.open(EntitySchemaModalComponent, { width: '550px' });

        dialogRef.afterClosed().pipe(take(1), filter(_ => _))
                 .subscribe((createdEntity) => this.entities.createEntity(createdEntity));
    }

    onEditEntity(entity: DynamicEntityObject) {
        const dialogRef = this.dialog.open(EntitySchemaModalComponent, { width: '550px', data: entity });

        dialogRef.afterClosed().pipe(take(1), filter(_ => _))
                 .subscribe((updatedEntity) => this.entities.updateEntity(updatedEntity));
    }

    onDeleteEntity(entity: DynamicEntityObject) {
        this.entities.deleteEntity(entity);
    }

}
