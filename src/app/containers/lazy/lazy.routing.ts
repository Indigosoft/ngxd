import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LazyPageComponent } from './lazy.component';

const routes: Route[] = [ { path: '', component: LazyPageComponent } ];

export const LazyRouting: ModuleWithProviders = RouterModule.forChild(routes);
