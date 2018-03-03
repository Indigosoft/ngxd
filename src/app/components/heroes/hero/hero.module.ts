import { NgModule, Optional } from '@angular/core';
import { HERO_COMPONENTS_PROVIDER, UNKNOWN_HERO_COMPONENT_PROVIDER } from '@app/components/heroes/hero/hero.provider';
import { ComponentPresenterModule } from '@app/core/component';

import { ArcherHeroModule } from './archer/archer.module';
import { UnknownHeroModule } from './unknown/unknown.module';

import { HeroComponentResolver } from './hero.resolver';
import { HeroComponent } from './hero.component';

@NgModule({
    imports: [
        ComponentPresenterModule,

        ArcherHeroModule,
        UnknownHeroModule
    ],
    declarations: [
        HeroComponent
    ],
    exports: [
        HeroComponent
    ],
    providers: [ {
        provide: HeroComponentResolver,
        useClass: HeroComponentResolver,
        deps: [
            [ new Optional(), HERO_COMPONENTS_PROVIDER ],
            [ new Optional(), UNKNOWN_HERO_COMPONENT_PROVIDER ]
        ]
    } ]
})
export class HeroModule {
}
