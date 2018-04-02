import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { LayoutModule } from '@app/layout/layout.module';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        LayoutModule,

        RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
