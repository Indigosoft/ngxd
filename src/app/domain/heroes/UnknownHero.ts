import { HeroTypes } from '@app/domain/heroes/HeroTypes';
import { HeroBase } from './HeroBase';

export class UnknownHero extends HeroBase {

    type: HeroTypes.Unknown;

    constructor(hero: UnknownHero) {
        super(hero);

        this.type = HeroTypes.Unknown;
    }

}
