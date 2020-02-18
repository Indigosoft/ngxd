import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicEntitiesModule } from '@app/dynamics';

import { SCHEMA_PROVIDERS } from './hero-schema.builder';
import { COMPONENT, PROVIDERS } from './hero.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicEntitiesModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
  ],
  declarations: [COMPONENT],
  providers: [PROVIDERS, SCHEMA_PROVIDERS],
})
export class HeroEntityModule {}
