import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EntitiesModule } from '@app/components';
import { DynamicEntitiesModule } from '@app/dynamics';
import { NgxdModule } from '@ngxd/core';

import { EntitiesPageComponent } from './entities.component';
import { EntitiesRouting } from './entities.routing';

@NgModule({
  imports: [
    CommonModule,
    DynamicEntitiesModule,
    EntitiesRouting,
    EntitiesModule,
    MatToolbarModule,
    NgxdModule,
    FormsModule,
  ],
  declarations: [EntitiesPageComponent],
})
export class EntitiesPageModule {}
