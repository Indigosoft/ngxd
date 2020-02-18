import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DynamicEntityComponentBase } from './dynamic-entity.base';
import { EntityComponentResolver } from './dynamic-entity.resolver';

@Component({
  selector: 'app-dynamic-entity',
  templateUrl: 'dynamic-entity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicEntityComponent extends DynamicEntityComponentBase {
  constructor(public resolver: EntityComponentResolver) {
    super();
  }
}
