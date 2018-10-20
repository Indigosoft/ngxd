import { DynamicEntityObject } from '@app/dynamics';

export class Item implements DynamicEntityObject {

    id: string;
    name: string;
    rank: string;
    icon: string;
    abilities: DynamicEntityObject[];

    constructor({ id, name, rank, icon, abilities }: Partial<Item>) {
        this.id = id || Math.random().toString().slice(2, 8);
        this.name = name;
        this.rank = rank;
        this.icon = icon;
        this.abilities = abilities || [];
    }

}
