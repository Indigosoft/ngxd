import { Type } from '@angular/core';
import { ChangeComponent, ChangeInput, Operation, Operations, ResetComponent, ResetInput } from './operations/index';
import { Executable } from './test-case.interfaces';

export class TestCaseBuilder {

    operations(operations: Executable[]): Operations {
        return new Operations(operations);
    }

    operation(operations: Executable[]): Operation {
        return new Operation(operations);
    }

    changeInput(name: string, value: any): ChangeInput {
        return new ChangeInput(name, value);
    }

    resetInput(name: string): ResetInput {
        return new ResetInput(name);
    }

    changeComponent(component: Type<any>): ChangeComponent {
        return new ChangeComponent(component);
    }

    resetComponent(): ResetComponent {
        return new ResetComponent();
    }

}
