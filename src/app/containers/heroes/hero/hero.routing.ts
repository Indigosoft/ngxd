import { Route, RouterModule } from '@angular/router';

import { HeroPageComponent } from './hero.component';

const routes: Route[] = [ { path: ':id', component: HeroPageComponent } ];

export const HeroPageRouting = RouterModule.forChild(routes);
