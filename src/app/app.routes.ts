import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const ROUTES: Route[] = [

    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', loadChildren: 'app/containers/entities/entities.module#EntitiesPageModule' }
        ]
    }

];
