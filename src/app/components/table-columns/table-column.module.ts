import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconTableColumnModule } from './icon/icon.module';
import { IdTableColumnModule } from './id/id.module';
import { TableColumnComponentResolver } from './table-column.resolver';
import { TextTableColumnModule } from './text/text.module';

@NgModule({
    imports: [ CommonModule, IconTableColumnModule, IdTableColumnModule, TextTableColumnModule ],
    providers: [ TableColumnComponentResolver ]
})
export class TableColumnModule {}
