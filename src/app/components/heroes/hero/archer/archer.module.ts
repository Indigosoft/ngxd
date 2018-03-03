import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroTypes } from '@app/domain/heroes';

import { HERO_COMPONENTS_PROVIDER } from '../hero.provider';

import { ArcherHeroComponent } from './archer.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ArcherHeroComponent
    ],
    entryComponents: [
        ArcherHeroComponent
    ],
    providers: [{
        provide: HERO_COMPONENTS_PROVIDER,
        useValue: [ HeroTypes.Archer, [ ArcherHeroComponent ] ],
        multi: true
    }]
})
export class ArcherHeroModule {}
