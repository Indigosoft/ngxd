import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxComponentOutletAdapterBuilder } from './adapter/adapter-builder';

import { DoCheckOnlyComponent, OnInitAndDoCheckComponent, OnInitOnlyComponent } from './adapter/adapter-components';
import { NgxContainer } from './container/container.component';
import { NgxComponentOutlet } from './directive/component.outlet';
import { NgxComponentOutletResolvePipe } from './pipe/resolve.pipe';

@NgModule({
    declarations: [
        NgxContainer,
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
        NgxContainer,
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
