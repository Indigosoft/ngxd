import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material';

import { DynamicEntitiesModule } from '@app/dynamics/dynamic-entities';
import { EntitiesModule } from '@app/components/entities';
import { NgxdModule } from '@ngxd/core';

import { EntitiesPageComponent } from './entities.component';
import { EntitiesRouting } from './entities.routing';

@NgModule({
    imports: [ CommonModule, DynamicEntitiesModule, EntitiesRouting, EntitiesModule, MatToolbarModule, NgxdModule, FormsModule ],
    declarations: [ EntitiesPageComponent ]
})
export class EntitiesPageModule {}
