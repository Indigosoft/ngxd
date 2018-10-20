import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActionsTableColumnModule } from './actions/actions.module';
import { IconTableColumnModule } from './icon/icon.module';
import { IdTableColumnModule } from './id/id.module';
import { TextTableColumnModule } from './text/text.module';

@NgModule({
    imports: [ CommonModule, ActionsTableColumnModule, IconTableColumnModule, IdTableColumnModule, TextTableColumnModule ]
})
export class TableColumnModule {}
