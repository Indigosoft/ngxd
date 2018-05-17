import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxComponentOutletAdapterBuilder } from './adapter/adapter-builder';
import { DoCheckOnlyComponent, OnInitAndDoCheckComponent, OnInitOnlyComponent } from './adapter/adapter-components';
import { NgxComponentOutletAdapterBuilderStrategyResolver } from './adapter/adapter-strategy';
import { NgxComponentOutlet } from './directive/component.outlet';
import { NgxComponentOutletResolvePipe } from './pipe/resolve.pipe';

@NgModule({
    declarations: [
        NgxComponentOutlet,
        NgxComponentOutletResolvePipe,
        OnInitOnlyComponent,
        DoCheckOnlyComponent,
        OnInitAndDoCheckComponent
    ],
    entryComponents: [
        OnInitOnlyComponent,
        DoCheckOnlyComponent,
        OnInitAndDoCheckComponent
    ],
    exports: [
        NgxComponentOutlet,
        NgxComponentOutletResolvePipe
    ]
})
export class NgxComponentOutletModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxComponentOutletModule,
            providers: [
                NgxComponentOutletAdapterBuilder,
                NgxComponentOutletAdapterBuilderStrategyResolver
            ]
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: NgxComponentOutletModule
        };
    }
}
