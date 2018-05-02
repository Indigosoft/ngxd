import { NgModule } from '@angular/core';

import { NgxComponentOutletAdapterModule } from './adapter/adapter.module';
import { NgxComponentOutlet } from './component.outlet';

@NgModule({
    imports: [
        NgxComponentOutletAdapterModule
    ],
    declarations: [
        NgxComponentOutlet
    ],
    exports: [
        NgxComponentOutlet
    ]
})
export class NgxComponentOutletModule {
}
