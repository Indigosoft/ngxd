import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DropdownControl, DropdownControlOptions, TextboxControl } from '@app/components/form';
import { CompositeSchemaBuilder, provideSchemaBuilder, SchemaBuilder } from '@app/schemas';
import { AbstractControlSchema, FormSchemaBuilder } from '@ngxd/forms';
import { Item } from './Item';

const ICONS = ['bow-icon', 'spear-icon', 'staff-icon'];
const RANKS = ['Spear', 'Staff', 'Bow'];

@Injectable()
export class ItemSchemaBuilder extends SchemaBuilder {
  constructor(private fsb: FormSchemaBuilder, private builder: CompositeSchemaBuilder) {
    super();
  }

  schema(entity: Item): AbstractControlSchema {
    return this.fsb.group(
      { key: 'entity', label: entity.name, subtitle: 'Item', $type: Item },
      {
        $type: Item,
        id: new TextboxControl({
          key: 'id',
          label: 'Entity Def',
          type: 'text',
          validator: [Validators.required],
        }),
        name: new TextboxControl({
          key: 'name',
          label: 'Name',
          type: 'text',
          validator: [Validators.required, Validators.minLength(2)],
        }),
        rank: new DropdownControl({
          key: 'rank',
          label: 'Rank',
          options: RANKS.map(icon => new DropdownControlOptions({ key: icon, value: icon })),
          validator: [Validators.required],
        }),
        icon: new DropdownControl({
          key: 'icon',
          label: 'Icon',
          options: ICONS.map(icon => new DropdownControlOptions({ key: icon, value: icon })),
          validator: [Validators.required],
        }),
        abilities: this.fsb.array(
          { key: 'abilities', label: 'Abilities' },
          entity.abilities.map(ability => this.builder.schema(ability))
        ),
      }
    );
  }
}

export const SCHEMA_PROVIDERS = provideSchemaBuilder(Item, ItemSchemaBuilder);
