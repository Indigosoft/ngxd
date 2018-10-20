import { DynamicEntityObject } from '@app/dynamics';

import { Ability } from './ability';
import { Hero } from './hero';
import { Item } from './item';

export const ENTITIES_DATA: DynamicEntityObject[] = [
    new Hero({
        name: 'Ser Barristan', rank: 'Knight', icon: 'knight-icon',
        abilities: [
            new Ability({ name: 'Axe', icon: 'battle-axe-icon', amount: 14 }),
            new Ability({ name: 'Bow', icon: 'bowman-icon', amount: 3 }),
            new Ability({ name: 'Spear', icon: 'stone-spear-icon', amount: 34 }),
            new Ability({ name: 'Intelligence', icon: 'fairy-wand-icon', amount: 2 }),
            new Ability({ name: 'Bravery', icon: 'sword-in-stone-icon', amount: 25 })
        ],
        items: [
            new Item({
                name: 'Executing Slicer', rank: 'Spear', icon: 'spear-icon',
                abilities: [
                    new Ability({ name: 'Damage', icon: 'sword-clash-icon', amount: 29 }),
                    new Ability({ name: 'Breaking Shield', icon: 'cracked-shield-icon', amount: 18 }),
                    new Ability({ name: 'Wave Strike', icon: 'wave-strike-icon', amount: 8 })
                ]
            })
        ]
    }),
    new Hero({
        name: 'Thoros of Myr', rank: 'Wizard', icon: 'wizard-icon',
        abilities: [
            new Ability({ name: 'Axe', icon: 'battle-axe-icon', amount: 3 }),
            new Ability({ name: 'Bow', icon: 'bowman-icon', amount: 5 }),
            new Ability({ name: 'Spear', icon: 'stone-spear-icon', amount: 2 }),
            new Ability({ name: 'Intelligence', icon: 'fairy-wand-icon', amount: 37 }),
            new Ability({ name: 'Bravery', icon: 'sword-in-stone-icon', amount: 1 })
        ],
        items: [
            new Item({
                name: 'Lorekeeper', rank: 'Staff', icon: 'staff-icon',
                abilities: [
                    new Ability({ name: 'Damage', icon: 'crystal-wand-icon', amount: 35 }),
                    new Ability({ name: 'Intelligence', icon: 'fairy-wand-icon', amount: 17 })
                ]
            })
        ]
    }),
    new Hero({
        name: 'Anguy', rank: 'Archer', icon: 'archer-icon',
        abilities: [
            new Ability({ name: 'Axe', icon: 'battle-axe-icon', amount: 5 }),
            new Ability({ name: 'Bow', icon: 'bowman-icon', amount: 19 }),
            new Ability({ name: 'Spear', icon: 'stone-spear-icon', amount: 4 }),
            new Ability({ name: 'Intelligence', icon: 'fairy-wand-icon', amount: 8 }),
            new Ability({ name: 'Bravery', icon: 'sword-in-stone-icon', amount: 13 })
        ],
        items: [
            new Item({
                name: 'Zigzag Zap', rank: 'Bow', icon: 'bow-icon',
                abilities: [
                    new Ability({ name: 'Damage', icon: 'high-shot-icon', amount: 24 }),
                    new Ability({ name: 'Accuracy', icon: 'reticule-icon', amount: 37 }),
                    new Ability({ name: 'Max. Arrows', icon: 'quiver-icon', amount: 5 })
                ]
            })
        ]
    })
];
