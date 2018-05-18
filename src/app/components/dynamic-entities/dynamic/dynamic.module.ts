import { NgModule } from '@angular/core';

import { NgxComponentOutletModule } from '../../../../../lib/ngx-component-outlet';

import { DynamicComponent, DynamicHostComponent } from './dynamic.component';

@NgModule({
    imports: [ NgxComponentOutletModule.forChild() ],
    declarations: [ DynamicComponent, DynamicHostComponent ],
    exports: [ DynamicComponent ]
})
export class DynamicModule {}

