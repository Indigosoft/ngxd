import { EntityObject } from '../EntityObject';

export class Hero implements EntityObject {

    id: string;
    name: string;
    rank: string;
    icon: string;
    abilities: EntityObject[];
    items: EntityObject[];

    constructor({ id, name, rank, icon, abilities, items }: Partial<Hero>) {
        this.id = id || Math.random().toString();
        this.name = name;
        this.rank = rank;
        this.icon = icon;
        this.abilities = abilities || [];
        this.items = items || [];
    }

}
