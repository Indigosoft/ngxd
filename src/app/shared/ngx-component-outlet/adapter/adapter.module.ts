import { NgModule } from '@angular/core';
import {
    NgxComponentOutletDoCheckOnly, NgxComponentOutletOnInitAndDoCheck, NgxComponentOutletOnInitOnly
} from './adapter-components';
import { NgxComponentOutletAdapterBuilder } from './adapter-builder';
import { NgxComponentOutletAdapterBuilderStrategyResolver} from './adapter-strategy';

@NgModule({
    providers: [
        NgxComponentOutletAdapterBuilder,
        NgxComponentOutletAdapterBuilderStrategyResolver
    ],
    declarations: [
        NgxComponentOutletOnInitOnly,
        NgxComponentOutletDoCheckOnly,
        NgxComponentOutletOnInitAndDoCheck
    ],
    entryComponents: [
        NgxComponentOutletOnInitOnly,
        NgxComponentOutletDoCheckOnly,
        NgxComponentOutletOnInitAndDoCheck
    ]
})
export class NgxComponentOutletAdapterModule {
}
