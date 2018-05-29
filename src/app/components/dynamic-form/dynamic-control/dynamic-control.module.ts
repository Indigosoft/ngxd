import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxdModule } from '@ngxd/core';

import { DynamicControlComponent, DynamicControlHostComponent } from './dynamic-control.component';

@NgModule({
    imports: [ CommonModule, NgxdModule.forChild() ],
    declarations: [ DynamicControlComponent, DynamicControlHostComponent ],
    exports: [ DynamicControlComponent ]
})
export class DynamicControlModule {}
