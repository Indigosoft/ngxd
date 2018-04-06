import { NgModule } from '@angular/core';

import { NgxComponentOutletAdapterBuilder } from './adapter-builder';
import {
    NgxComponentOutletAdapterBuilderDefaultStrategy, NgxComponentOutletAdapterBuilderDoCheckOnlyStrategy,
    NgxComponentOutletAdapterBuilderOnInitAndDoCheckStrategy, NgxComponentOutletAdapterBuilderOnInitOnlyStrategy,
    NgxComponentOutletAdapterBuilderStrategyResolver, NgxComponentOutletDoCheckOnly, NgxComponentOutletOnInitAndDoCheck,
    NgxComponentOutletOnInitOnly
} from './adapter-builder-strategies';
import { NgxComponentOutlet } from './component.outlet';

@NgModule({
    providers: [
        NgxComponentOutletAdapterBuilder,
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
