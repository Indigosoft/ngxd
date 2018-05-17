import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TablePageComponent } from './table.component';

const routes: Route[] = [{ path: '', component: TablePageComponent }];

export const TableRouting: ModuleWithProviders = RouterModule.forChild(routes);
