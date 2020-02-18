import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { NgxdModule } from '@ngxd/core';

import { DynamicEntitiesComponent } from './dynamic-entities.component';
import { DynamicEntityModule } from './dynamic-entity';

@NgModule({
  imports: [CommonModule, DynamicEntityModule, MatGridListModule, NgxdModule],
  declarations: [DynamicEntitiesComponent],
  exports: [DynamicEntitiesComponent, DynamicEntityModule],
})
export class DynamicEntitiesModule {}
