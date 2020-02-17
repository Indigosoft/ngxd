import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { COMPONENT, PROVIDERS } from './icon.component';

@NgModule({
  imports: [CommonModule, MatCardModule],
  declarations: [COMPONENT],
  providers: [PROVIDERS],
})
export class IconTableColumnModule {}
