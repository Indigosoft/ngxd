import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  imports: [NavbarModule, RouterModule],
  declarations: [LayoutComponent],
})
export class LayoutModule {}
