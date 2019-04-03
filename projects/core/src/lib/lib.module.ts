import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxComponentOutletAdapterBuilder } from './adapter/adapter.builder';

import { DoCheckOnlyComponent, OnInitAndDoCheckComponent, OnInitOnlyComponent } from './adapter/lifecycle.components';
import { NgxComponentOutlet } from './directive/component.outlet';
import { NgxComponentOutletResolvePipe } from './helpers/resolve.pipe';

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
    ],
    providers: [
        NgxComponentOutletAdapterBuilder
    ]
})
export class NgxdModule {
    /**
     * @deprecated
     */
    static forRoot(): ModuleWithProviders {
        throw new Error('Deprecation import through NgxdModule.forRoot(), use import as NgxdModule.');
    }

    /**
     * @deprecated
     */
    static forChild(): ModuleWithProviders {
        throw new Error('Deprecation import through NgxdModule.forChild(), use import as NgxdModule.');
    }
}
