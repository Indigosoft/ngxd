import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EntitiesService, Hero, TableSchema, TableService } from '@app/components';
import { DynamicEntityObject } from '@app/dynamics';
import { EntitySchemaModalComponent, TableColumnSchemaModalComponent } from '@app/schemas';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-table-page',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    const dialogRef = this.dialog.open(TableColumnSchemaModalComponent, { width: '100vw' });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(_ => _)
      )
      .subscribe(createdColumn => this.table.createColumn(createdColumn));
  }

  onCreateEntity() {
    const entity: Hero = new Hero({
      id: null,
      name: null,
      rank: null,
      icon: null,
      abilities: [],
      items: [],
    });
    entity.id = null;
    const dialogRef = this.dialog.open(EntitySchemaModalComponent, {
      width: '100vw',
      data: entity,
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(_ => _)
      )
      .subscribe(createdEntity => this.entities.createEntity(createdEntity));
  }

  onEditEntity(entity: DynamicEntityObject) {
    const dialogRef = this.dialog.open(EntitySchemaModalComponent, {
      width: '100vw',
      data: entity,
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(_ => _)
      )
      .subscribe(updatedEntity => this.entities.updateEntity(updatedEntity));
  }

  onDeleteEntity(entity: DynamicEntityObject) {
    this.entities.deleteEntity(entity);
  }
}
