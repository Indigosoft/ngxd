import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material';

import { DynamicEntitiesComponent } from './dynamic-entities.component';
import { DynamicEntityModule } from './dynamic-entity';

@NgModule({
    imports: [ CommonModule, DynamicEntityModule, MatGridListModule ],
    declarations: [ DynamicEntitiesComponent ],
    exports: [ DynamicEntitiesComponent, DynamicEntityModule ]
})
export class DynamicEntitiesModule {}
