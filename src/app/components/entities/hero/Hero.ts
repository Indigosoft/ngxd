import { DynamicEntityObject } from '@app/dynamics';

export class Hero implements DynamicEntityObject {

    id: string;
    name: string;
    rank: string;
    icon: string;
    abilities: DynamicEntityObject[];
    items: DynamicEntityObject[];

    constructor({ id, name, rank, icon, abilities, items }: Partial<Hero>) {
        this.id = id || Math.random().toString().slice(2, 8);
        this.name = name;
        this.rank = rank;
        this.icon = icon;
        this.abilities = abilities || [];
        this.items = items || [];
    }

}
