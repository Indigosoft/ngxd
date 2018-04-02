import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { DynamicsComponent } from './dynamics.component';
import { DynamicModule } from './dynamic/dynamic.module';

@NgModule({
    imports: [
        CommonModule,
        DynamicModule,
        MatGridListModule
    ],
    declarations: [
        DynamicsComponent
    ],
    exports: [
        DynamicsComponent,
        DynamicModule
    ]
})
export class DynamicsModule {}

