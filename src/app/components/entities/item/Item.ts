import { EntityObject } from '../EntityObject';

export class Item implements EntityObject {

    id: string;
    name: string;
    rank: string;
    icon: string;
    abilities: EntityObject[];

    constructor({ id, name, rank, icon, abilities }: Partial<Item>) {
        this.id = id || Math.random().toString().slice(2, 8);
        this.name = name;
        this.rank = rank;
        this.icon = icon;
        this.abilities = abilities || [];
    }

    flatten(): EntityObject[] {
        return this.abilities;
    }

}
