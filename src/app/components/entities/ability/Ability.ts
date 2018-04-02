import { EntityObject } from '../EntityObject';

export class Ability implements EntityObject {

    id: string;
    name: string;
    icon: string;
    amount: number;

    constructor({ id, name, icon, amount }: Partial<Ability>) {
        this.id = Math.random().toString();
        this.name = name;
        this.icon = icon;
        this.amount = amount || 0;
    }

}
