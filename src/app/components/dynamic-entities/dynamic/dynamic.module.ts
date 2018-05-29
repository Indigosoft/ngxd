import { NgModule } from '@angular/core';

import { NgxdModule } from '@ngxd/core';

import { DynamicComponent, DynamicHostComponent } from './dynamic.component';

@NgModule({
    imports: [ NgxdModule.forChild() ],
    declarations: [ DynamicComponent, DynamicHostComponent ],
    exports: [ DynamicComponent ]
})
export class DynamicModule {}

