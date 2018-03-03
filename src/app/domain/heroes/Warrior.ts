import { HeroBase } from './HeroBase';
import { HeroTypes } from './HeroTypes';

export class Warrior extends HeroBase {

    public strong: number;

    public type: HeroTypes.Warrior;

    constructor(hero: Warrior) {
        super(hero);

        this.type = HeroTypes.Warrior;
    }

}
