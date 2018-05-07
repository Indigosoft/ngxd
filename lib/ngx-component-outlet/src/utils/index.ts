import { OnChanges, SimpleChanges } from '@angular/core';

export const PRIVATE_PREFIX = '__ngxOnChanges_';

export type OnChangesExpando = OnChanges & {
    __ngOnChanges_: SimpleChanges | null | undefined;
    [ key: string ]: any;
};

export function onChangesWrapper(delegateHook: (() => void) | null) {
    return function(this: OnChangesExpando) {
        const simpleChanges = this[ PRIVATE_PREFIX ];

        if (simpleChanges != null) {
            if (this.ngOnChanges) {
                this.ngOnChanges(simpleChanges);
            }
            this[ PRIVATE_PREFIX ] = null;
        }

        if (delegateHook) {
            delegateHook.apply(this);
        }
    };
}

export function markForCheckWrapper(delegateHook: (() => void) | null, cd) {
    return function(this) {
        if (delegateHook) {
            delegateHook.apply(this);
        }

        if (cd) {
            cd.markForCheck();
        }
    };
}

export function hasProperty(context: any, name: string): boolean {
    if (context.hasOwnProperty(name)) {
        return true;
    }

    const prototype = Object.getPrototypeOf(context);

    if (prototype) {
        return hasProperty(prototype, name);
    }

    return false;
}

export function getPropertyDescriptor(context: any, name: string): PropertyDescriptor {
    if (context.hasOwnProperty(name)) {
        return Object.getOwnPropertyDescriptor(context, name);
    }

    const prototype = Object.getPrototypeOf(context);

    if (prototype) {
        return getPropertyDescriptor(prototype, name);
    }

    return void 0;
}
