import { EntityObject } from '../EntityObject';

export class Item implements EntityObject {

    id: string;
    name: string;
    rank: string;
    icon: string;
    abilities: EntityObject[];

    constructor({ id, name, rank, icon, abilities }: Partial<Item>) {
        this.id = id || Math.random().toString();
        this.name = name;
        this.rank = rank;
        this.icon = icon;
        this.abilities = abilities || [];
    }

}
