import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { COMPONENT, PROVIDERS } from './actions.component';

@NgModule({
  imports: [CommonModule, MatMenuModule, MatButtonModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class ActionsTableColumnModule {}
