import { Inject, Injectable, Optional, SimpleChange, Type } from '@angular/core';
import { HeroBase, HeroTypes } from '@app/domain/heroes';
import { Map } from 'immutable';

import { HeroComponentBase } from './hero.component.interface';
import { HERO_COMPONENTS_PROVIDER, HeroComponentProvider, UNKNOWN_HERO_COMPONENT_PROVIDER } from './hero.provider';

@Injectable()
export class HeroComponentResolver {

    private components: Map<HeroTypes, Type<HeroComponentBase>[]>;
    private unknown: Type<HeroComponentBase>[];

    constructor(
        @Optional() @Inject(HERO_COMPONENTS_PROVIDER)
            components: HeroComponentProvider[] = [],
        @Optional() @Inject(UNKNOWN_HERO_COMPONENT_PROVIDER)
            unknown: Type<HeroComponentBase>[] = []
    ) {
        this.components = Map<HeroTypes, Type<HeroComponentBase>[]>(components);
        this.unknown = unknown;
    }

    hasChangesType(change: SimpleChange): boolean {
        if (!change.currentValue) {
            return true;
        }

        if (!change.previousValue) {
            return true;
        }

        return change.currentValue.type !== change.previousValue.type;
    }

    resolve(hero: HeroBase): Type<HeroComponentBase>[] {
        return this.components.get(hero.type, this.unknown);
    }

}
