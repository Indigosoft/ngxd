import { NgModule } from '@angular/core';

import { HomePageComponent } from './home.component';
import { HomePageRouting } from './home.routing';

@NgModule({
    imports: [
        HomePageRouting
    ],
    declarations: [
        HomePageComponent
    ]
})
export class HomePageModule {
}
