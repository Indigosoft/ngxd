import { HeroTypes } from './HeroTypes';

export class HeroBase {

    name: string;
    type: HeroTypes;

    constructor(hero: Partial<HeroBase>) {
        Object.assign(this as HeroBase, hero);
    }

}
