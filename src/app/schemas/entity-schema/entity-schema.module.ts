import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';
import { DynamicFormModule } from '@app/dynamics/dynamic-form';
import { EntitySchemaModalComponent } from './entity-schema-modal.component';
import { EntitySchemaBuilder } from './entity-schema.builder';
import { EntitySchemaComponent } from './entity-schema.component';

@NgModule({
    imports: [ CommonModule, DynamicFormModule, MatDialogModule, MatButtonModule, MatCardModule ],
    declarations: [ EntitySchemaComponent, EntitySchemaModalComponent ],
    entryComponents: [ EntitySchemaModalComponent ],
    providers: [ EntitySchemaBuilder ]
})
export class EntitySchemaModule {}
