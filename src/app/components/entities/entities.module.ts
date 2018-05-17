import { NgModule } from '@angular/core';

import { ENTITIES_PROVIDERS } from './index';

import { AbilityEntityModule } from './ability/ability.module';
import { HeroEntityModule } from './hero/hero.module';
import { ItemEntityModule } from './item/item.module';

@NgModule({
    imports: [ AbilityEntityModule, HeroEntityModule, ItemEntityModule ],
    providers: [ ENTITIES_PROVIDERS ]
})
export class EntitiesModule {}
