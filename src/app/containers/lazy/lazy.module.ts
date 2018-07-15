import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatGridListModule, MatToolbarModule } from '@angular/material';
import { DynamicLazyModule } from '@app/dynamics/dynamic-lazy';

import { LazyPageComponent } from './lazy.component';
import { LazyRouting } from './lazy.routing';

@NgModule({
    imports: [
        CommonModule, LazyRouting,
        DynamicLazyModule.forChild('src/app/components/lazy/lazy.module#LazyModule'),
        MatCardModule, MatToolbarModule, MatGridListModule
    ],
    declarations: [ LazyPageComponent ]
})
export class LazyPageModule {}
