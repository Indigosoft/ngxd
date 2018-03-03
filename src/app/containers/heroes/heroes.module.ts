import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeroesModule } from '@app/components/heroes/heroes.module';
import { HeroDataModule } from '@app/data/heroes';

import { HeroesPageComponent } from './heroes.component';
import { HeroesPageRouting } from './heroes.routing';

@NgModule({
    imports: [
        CommonModule,

        HeroesPageRouting,

        HeroesModule,
        HeroDataModule
    ],
    declarations: [
        HeroesPageComponent
    ]
})
export class HeroesPageModule {}
