import { HeroTypes } from '@app/domain/heroes';

export const HEROES: any[] = [ {
    name: 'Archer',
    type: HeroTypes.Archer,
    dodge: 1
}, {
    name: 'Warrior',
    type: HeroTypes.Warrior,
    strong: 2
}, {
    name: 'Wizard',
    type: HeroTypes.Wizard,
    intelligence: 3
} ];
