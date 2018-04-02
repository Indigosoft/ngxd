import { ENTITY_PROVIDER, EntityProvider } from '@app/components/entities/entity.provider';

import { Item } from './Item';
import { ItemEntityComponent } from './item.component';

const entityProvider: EntityProvider = { entityType: Item, componentType: ItemEntityComponent };

export const ITEM_PROVIDERS = [ { provide: ENTITY_PROVIDER, useValue: entityProvider, multi: true } ];
export const ITEM_COMPONENTS = [ ItemEntityComponent ];
