import { Route } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout.component';

export const ROUTES: Route[] = [

    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: '',
        component: LayoutComponent,
        children: [

            { path: 'home', loadChildren: 'app/containers/home/home.module#HomePageModule' },

            { path: 'heroes', loadChildren: 'app/containers/heroes/heroes.module#HeroesPageModule' }

        ]
    }

];
