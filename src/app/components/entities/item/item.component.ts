import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicEntityComponentBase, DynamicEntityModule } from '@app/dynamics';

import { Item } from './Item';

@Component({
  selector: 'app-item-entity',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemEntityComponent extends DynamicEntityComponentBase {
  @Input() entity: Item;

  trackById(index, { id }): string {
    return id;
  }
}

export const COMPONENT = ItemEntityComponent;
export const PROVIDERS = DynamicEntityModule.provide(Item, ItemEntityComponent);
