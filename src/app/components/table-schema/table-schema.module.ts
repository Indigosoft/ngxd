import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormModule } from '../dynamic-form';
import { TableSchemaComponent } from './table-schema.component';
import { TableSchemaService } from './table-schema.service';

@NgModule({
    imports: [ CommonModule, DynamicFormModule ],
    declarations: [ TableSchemaComponent ],
    exports: [ TableSchemaComponent ],
    providers: [ TableSchemaService ]
})
export class TableSchemaModule {}
