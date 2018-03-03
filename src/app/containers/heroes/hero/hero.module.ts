import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeroesModule } from '@app/components/heroes/heroes.module';

import { HeroPageRouting } from './hero.routing';

import { HeroPageComponent } from './hero.component';

@NgModule({
    imports: [
        CommonModule,

        HeroPageRouting,

        HeroesModule
    ],
    declarations: [
        HeroPageComponent
    ]
})
export class HeroPageModule {}
