import { Injectable, SimpleChange, Type } from '@angular/core';
import { HeroBase, HeroTypes } from '@app/domain/heroes';
import { Map } from 'immutable';

import { HeroComponentBase } from './hero.component.interface';
import { HeroComponentProvider } from './hero.provider';

@Injectable()
export class HeroComponentResolver {

    private components: Map<HeroTypes, Type<HeroComponentBase>[]>;

    constructor(components: HeroComponentProvider[] = [], private unknown: Type<HeroComponentBase>[] = []) {
        this.components = Map<HeroTypes, Type<HeroComponentBase>[]>(components);
    }

    hasChanges(change: SimpleChange): boolean {
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
