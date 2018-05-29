import { ComponentFixture } from '@angular/core/testing';
import { Executable, TestCaseState } from '../test-case.interfaces';

export class SimpleChangeInput extends Executable {
    constructor(protected name: string, protected value: any) { super(); }

    execute<TComponent>(fixture: ComponentFixture<TComponent>) {
        fixture.componentInstance[ this.name ] = this.value;
    }

    report<TComponent>(state: TestCaseState): TestCaseState {
        return {
            ...state, context: {
                ...state.context,
                host: {
                    ...state.context.host,
                    [ this.name ]: this.value
                },
                dynamic: {
                    ...state.context.dynamic,
                    [ this.name ]: this.value
                }
            }
        };
    }
}

export class ChangeInput extends SimpleChangeInput {}

export class ResetInput extends ChangeInput {
    constructor(protected name) {
        super(name, void 0);
    }
}
