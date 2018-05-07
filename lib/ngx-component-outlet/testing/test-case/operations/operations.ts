import { ComponentFixture } from '@angular/core/testing';
import { Executable, TestCaseState } from '../test-case.interfaces';

export class Operations extends Executable {
    constructor(protected operations: Executable[]) { super(); }

    execute<TComponent>(fixture: ComponentFixture<TComponent>) {
        this.operations.forEach((operation) => operation.execute(fixture));

        return this;
    }

    report<TComponent>(): TestCaseState {
        return this.operations.reduce((state, operation) => operation.report(state), {
            context: {
                host: { name: void 0, label: void 0 },
                dynamic: { name: void 0, label: void 0 },
                type: void 0
            },
            lifecycle: []
        });
    }

}
