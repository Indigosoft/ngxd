import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicEntityComponentBase, DynamicEntityModule } from '@app/dynamics';

import { Hero } from './Hero';

@Component({
  selector: 'app-hero-entity',
  templateUrl: 'hero.component.html',
  styleUrls: ['hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEntityComponent extends DynamicEntityComponentBase {
  @Input() entity: Hero;
  @Input() name: string;
  @Input() forInput: string;

  trackById(index, { id }): string {
    return id;
  }
}

export const COMPONENT = HeroEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Hero, HeroEntityComponent);
