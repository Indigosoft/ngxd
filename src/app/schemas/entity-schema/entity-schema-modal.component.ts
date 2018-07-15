import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Hero } from '@app/components/entities';

@Component({
    selector: 'app-entity-schema-modal',
    templateUrl: 'entity-schema-modal.component.html'
})
export class EntitySchemaModalComponent {
    invalid: boolean;

    schema: Hero = this.getDefault();

    constructor(@Inject(MAT_DIALOG_DATA) public hero: Hero) {
        this.schema = hero || this.schema;
    }

    private getDefault(): Hero {
        const hero = new Hero({
            id: null, name: null, rank: null, icon: null,
            abilities: [], items: []
        });

        hero.id = null;

        return hero;
    }
}
