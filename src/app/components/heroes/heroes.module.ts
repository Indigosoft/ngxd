import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroesComponent } from '@app/components/heroes/heroes.component';

import { HeroModule } from './hero/hero.module';

@NgModule({
    imports: [
        CommonModule,

        HeroModule
    ],
    declarations: [
        HeroesComponent
    ],
    exports: [
        HeroesComponent,

        HeroModule
    ]
})
export class HeroesModule {}
