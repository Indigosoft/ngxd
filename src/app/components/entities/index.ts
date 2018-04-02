import { EntityComponentResolver } from './entity-component.resolver';
import { EntitiesService } from './entities.service';

export * from './EntityObject';
export { EntitiesService, EntityComponentResolver };

export const ENTITIES_PROVIDERS = [
    EntitiesService,
    EntityComponentResolver
];
