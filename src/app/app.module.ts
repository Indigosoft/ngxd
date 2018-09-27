import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgxdModule } from '@ngxd/core';
import { NgxdFormsModule } from '@ngxd/forms';

import { AppComponent } from './app.component';

import { ROUTES } from './app.routes';
import { LayoutModule } from './layout/layout.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        LayoutModule,

        ReactiveFormsModule,
        NgxdModule,
        NgxdFormsModule.forRoot(),

        RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
