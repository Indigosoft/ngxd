import { Route, RouterModule } from '@angular/router';

import { HeroesPageComponent } from './heroes.component';

const routes: Route[] = [ { path: '', component: HeroesPageComponent } ];

export const HeroesPageRouting = RouterModule.forChild(routes);
