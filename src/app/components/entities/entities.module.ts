import { NgModule } from '@angular/core';
import { AbilityEntityModule } from './ability';
import { EntitiesService } from './entities.service';
import { HeroEntityModule } from './hero';
import { ItemEntityModule } from './item';

@NgModule({
  imports: [AbilityEntityModule, HeroEntityModule, ItemEntityModule],
  providers: [EntitiesService],
})
export class EntitiesModule {}
