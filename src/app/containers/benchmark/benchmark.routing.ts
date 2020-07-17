import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { BenchmarkPageComponent } from './benchmark.component';

const routes: Route[] = [{ path: '', component: BenchmarkPageComponent }];

export const BenchmarkRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
