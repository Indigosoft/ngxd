import { NgModule } from '@angular/core';

import {
    NgxComponentOutletAdapterBuilderDefaultStrategy, NgxComponentOutletAdapterBuilderDoCheckOnlyStrategy,
    NgxComponentOutletAdapterBuilderOnInitAndDoCheckStrategy, NgxComponentOutletAdapterBuilderOnInitOnlyStrategy,
    NgxComponentOutletAdapterBuilderStrategyResolver, NgxComponentOutletDoCheckOnly, NgxComponentOutletOnInitAndDoCheck,
    NgxComponentOutletOnInitOnly
} from './adapter-builder-strategies';
import { NgxComponentOutlet } from './component.outlet';

@NgModule({
    providers: [
        NgxComponentOutletAdapterBuilderDefaultStrategy,
        NgxComponentOutletAdapterBuilderOnInitOnlyStrategy,
        NgxComponentOutletAdapterBuilderDoCheckOnlyStrategy,
        NgxComponentOutletAdapterBuilderOnInitAndDoCheckStrategy,
        NgxComponentOutletAdapterBuilderStrategyResolver
    ],
    declarations: [
        NgxComponentOutlet,
        NgxComponentOutletOnInitOnly,
        NgxComponentOutletDoCheckOnly,
        NgxComponentOutletOnInitAndDoCheck
    ],
    entryComponents: [
        NgxComponentOutletOnInitOnly,
        NgxComponentOutletDoCheckOnly,
        NgxComponentOutletOnInitAndDoCheck
    ],
    exports: [
        NgxComponentOutlet
    ]
})
export class NgxComponentOutletModule {}
