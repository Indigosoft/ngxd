import {NgModule} from '@angular/core';

import {DoCheckHook} from './hooks/do-check-hook';
import {NgxComponentOutletDirective} from './ngx-component-outlet';
import {NgxComponentOutletResolvePipe} from './resolver/resolve-pipe';

@NgModule({
  declarations: [
    NgxComponentOutletDirective,
    NgxComponentOutletResolvePipe,
    DoCheckHook,
  ],
  exports: [NgxComponentOutletDirective, NgxComponentOutletResolvePipe],
})
export class NgxdModule {
}
