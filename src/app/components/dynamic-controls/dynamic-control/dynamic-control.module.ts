import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxComponentOutletModule } from '../../../../../lib/ngx-component-outlet';

import { DynamicControlComponent, DynamicControlHostComponent } from './dynamic-control.component';

@NgModule({
    imports: [ CommonModule, ReactiveFormsModule, NgxComponentOutletModule.forChild() ],
    declarations: [ DynamicControlComponent, DynamicControlHostComponent ],
    exports: [ DynamicControlComponent ]
})
export class DynamicControlModule {}
