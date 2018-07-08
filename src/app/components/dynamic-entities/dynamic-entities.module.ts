import { CommonModule } from '@angular/common';
import { NgModule, ValueProvider } from '@angular/core';
import { MatGridListModule } from '@angular/material';

import { DynamicEntitiesComponent } from './dynamic-entities.component';
import { ENTITIES_DATA_PROVIDER } from './dynamic-entities.provider';
import { DynamicEntitiesService } from './dynamic-entities.service';
import { DynamicEntityModule, DynamicEntityObject } from './dynamic-entity';

@NgModule({
    imports: [ CommonModule, DynamicEntityModule, MatGridListModule ],
    declarations: [ DynamicEntitiesComponent ],
    exports: [ DynamicEntitiesComponent, DynamicEntityModule ],
    providers: [ DynamicEntitiesService ]
})
export class DynamicEntitiesModule {
    static useData(data: DynamicEntityObject[]): ValueProvider {
        return { provide: ENTITIES_DATA_PROVIDER, useValue: data };
    }
}
