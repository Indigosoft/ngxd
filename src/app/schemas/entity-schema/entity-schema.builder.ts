import { Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { AbstractControlSchema, FormGroupSchema, FormSchemaBuilder } from '@ngxd/forms';
import { Hero } from '@app/components/entities';
import { DropdownControl, DropdownControlOptions, TextboxControl } from '@app/components/form';

@Injectable()
export class EntitySchemaBuilder {

    constructor(private fsb: FormSchemaBuilder) {}

    form(formSchema: AbstractControlSchema): AbstractControl {
        return this.fsb.form(formSchema);
    }

    formSchema(schema: Hero): FormGroupSchema {
        return this.fsb.group({ key: 'entity', label: 'Entity' }, {
            id: new TextboxControl({
                key: 'id', label: 'Entity Def', type: 'text',
                validator: [ Validators.required ]
            }),
            name: new TextboxControl({
                key: 'name', label: 'Name', type: 'text',
                validator: [ Validators.required, Validators.minLength(2) ]
            }),
            rank: new DropdownControl({
                key: 'rank', label: 'Rank', options: [
                    new DropdownControlOptions({ key: 'Knight', value: 'Knight' }),
                    new DropdownControlOptions({ key: 'Wizard', value: 'Wizard' }),
                    new DropdownControlOptions({ key: 'Archer', value: 'Archer' })
                ], validator: [ Validators.required ]
            }),
            icon: new DropdownControl({
                key: 'icon', label: 'Icon', options: [
                    new DropdownControlOptions({ key: 'knight-icon', value: 'knight-icon' }),
                    new DropdownControlOptions({ key: 'wizard-icon', value: 'wizard-icon' }),
                    new DropdownControlOptions({ key: 'archer-icon', value: 'archer-icon' })
                ], validator: [ Validators.required ]
            }),
            abilities: this.fsb.array({ key: 'abilities', label: 'Abilities' }, []),
            items: this.fsb.array({ key: 'items', label: 'Items' }, [])
        });
    }
}
