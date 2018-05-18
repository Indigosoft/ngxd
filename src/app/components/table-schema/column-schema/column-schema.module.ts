import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicControlsModule } from '../../dynamic-controls';

import { TableColumnSchemaComponent, TableColumnSchemaService } from './column-schema.component';

@NgModule({
    imports: [ ReactiveFormsModule, DynamicControlsModule ],
    declarations: [ TableColumnSchemaComponent ],
    exports: [ TableColumnSchemaComponent ],
    providers: [ TableColumnSchemaService ]
})
export class TableColumnSchemaModule {}
