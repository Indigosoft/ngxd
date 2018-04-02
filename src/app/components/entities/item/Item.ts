import { EntityObject } from '../EntityObject';
import { Ability } from '../ability/Ability';

export class Item implements EntityObject {

    id: string;
    name: string;
    rank: string;
    icon: string;
    abilities: Ability[];

    constructor({ id, name, rank, icon, abilities }: Partial<Item>) {
        this.id = id || Math.random().toString();
        this.name = name;
        this.rank = rank;
        this.icon = icon;
        this.abilities = abilities || [];
    }

}
