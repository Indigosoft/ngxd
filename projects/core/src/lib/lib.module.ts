import { NgModule } from '@angular/core';
import { NgxComponentOutletAdapterBuilder } from './adapter/adapter.builder';

import {
  DoCheckOnlyComponent,
  OnInitAndDoCheckComponent,
  OnInitOnlyComponent,
} from './adapter/lifecycle.components';
import { NgxComponentOutletDirective } from './directive/component.outlet';
import { NgxComponentOutletResolvePipe } from './helpers/resolve.pipe';

@NgModule({
  declarations: [
    NgxComponentOutletDirective,
    NgxComponentOutletResolvePipe,
    OnInitOnlyComponent,
    DoCheckOnlyComponent,
    OnInitAndDoCheckComponent,
  ],
  entryComponents: [OnInitOnlyComponent, DoCheckOnlyComponent, OnInitAndDoCheckComponent],
  exports: [NgxComponentOutletDirective, NgxComponentOutletResolvePipe],
  providers: [NgxComponentOutletAdapterBuilder],
})
export class NgxdModule {}
