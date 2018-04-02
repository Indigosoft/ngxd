import { NgModule } from '@angular/core';

import { NgxComponentOutletModule } from '@app/shared/ngx-component-outlet';

import { DynamicComponent, DynamicHostComponent } from './dynamic.component';

@NgModule({
    imports: [
        NgxComponentOutletModule
    ],
    declarations: [
        DynamicComponent,
        DynamicHostComponent
    ],
    exports: [
        DynamicComponent
    ]
})
export class DynamicModule {}

