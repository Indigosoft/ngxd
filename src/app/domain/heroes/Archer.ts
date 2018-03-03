import { HeroBase } from './HeroBase';
import { HeroTypes } from './HeroTypes';

export class Archer extends HeroBase {

    public dodge: number;

    public type: HeroTypes.Archer;

    constructor(hero: Partial<Archer>) {
        super(hero);

        this.type = HeroTypes.Archer;
    }

}
