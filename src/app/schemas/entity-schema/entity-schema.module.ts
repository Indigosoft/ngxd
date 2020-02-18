import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { DynamicFormModule } from '@app/dynamics';

import { EntitySchemaModalComponent } from './entity-schema-modal.component';
import { EntitySchemaComponent } from './entity-schema.component';

@NgModule({
  imports: [CommonModule, DynamicFormModule, MatDialogModule, MatButtonModule, MatCardModule],
  declarations: [EntitySchemaComponent, EntitySchemaModalComponent],
  entryComponents: [EntitySchemaModalComponent],
})
export class EntitySchemaModule {}
