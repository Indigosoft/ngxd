import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxComponentOutletModule } from '../../../../../lib/ngx-component-outlet/src';

import { COMPONENTS, PROVIDERS } from './entities';
import { TableCellComponent, TableCellHostComponent } from './table-cell.component';
import { TableCellEntityComponentResolver } from './table-cell.resolver';

@NgModule({
    imports: [ CommonModule, NgxComponentOutletModule.forChild(), MatCardModule ],
    declarations: [ COMPONENTS, TableCellHostComponent, TableCellComponent ],
    entryComponents: [ COMPONENTS ],
    exports: [ TableCellComponent ],
    providers: [ PROVIDERS, TableCellEntityComponentResolver ]
})
export class TableCellModule {}
