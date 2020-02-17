import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { EntitiesPageComponent } from './entities.component';

const routes: Route[] = [{ path: '', component: EntitiesPageComponent }];

export const EntitiesRouting: ModuleWithProviders = RouterModule.forChild(routes);
