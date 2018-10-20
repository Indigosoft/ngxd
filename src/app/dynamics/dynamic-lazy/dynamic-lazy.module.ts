import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';

import { DynamicLazyComponent, LAZY_MODULE_PATH } from './dynamic-lazy.component';

@NgModule({
    imports: [ CommonModule, NgxdModule ],
    declarations: [ DynamicLazyComponent ],
    exports: [ DynamicLazyComponent ]
})
export class DynamicLazyModule {
    static forChild(lazyModulePath: string): ModuleWithProviders {
        return {
            ngModule: DynamicLazyModule,
            providers: [ { provide: LAZY_MODULE_PATH, useValue: lazyModulePath } ]
        };
    }
}
