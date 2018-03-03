import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UNKNOWN_HERO_COMPONENT_PROVIDER } from '../hero.provider';

import { UnknownHeroComponent } from './unknown.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        UnknownHeroComponent
    ],
    entryComponents: [
        UnknownHeroComponent
    ],
    providers: [ {
        provide: UNKNOWN_HERO_COMPONENT_PROVIDER,
        useValue: [ UnknownHeroComponent ]
    } ]
})
export class UnknownHeroModule {}
