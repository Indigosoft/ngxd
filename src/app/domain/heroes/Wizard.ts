import { HeroBase } from './HeroBase';
import { HeroTypes } from './HeroTypes';

export class Wizard extends HeroBase {

    public intelligence: number;

    public type: HeroTypes.Wizard;

    constructor(hero: Partial<Wizard>) {
        super(hero);

        this.type = HeroTypes.Wizard;
    }

}
