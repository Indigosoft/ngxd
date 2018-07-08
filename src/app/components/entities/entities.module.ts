import { NgModule } from '@angular/core';
import { AbilityEntityModule } from './ability';
import { EntitiesDataProvider } from './entities.data';
import { HeroEntityModule } from './hero';
import { ItemEntityModule } from './item';

@NgModule({
    imports: [ AbilityEntityModule, HeroEntityModule, ItemEntityModule ],
    providers: [ EntitiesDataProvider ]
})
export class EntitiesModule {}
