import { Ability } from '../ability/Ability';
import { EntityObject } from '../EntityObject';
import { Item } from '../item/Item';

export class Hero implements EntityObject {

    id: string;
    name: string;
    rank: string;
    icon: string;
    abilities: Ability[];
    items: Item[];

    constructor({ id, name, rank, icon, abilities, items }: Partial<Hero>) {
        this.id = id || Math.random().toString();
        this.name = name;
        this.rank = rank;
        this.icon = icon;
        this.abilities = abilities || [];
        this.items = items || [];
    }

}
