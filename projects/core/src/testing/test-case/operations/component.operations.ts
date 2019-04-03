import { Type } from '@angular/core';
import { TestCaseState } from '../test-case.interfaces';
import { SimpleChangeInput } from './input.operations';

export class ChangeComponent extends SimpleChangeInput {
  constructor(protected value: Type<any>) {
    super('component', value);
  }

  report<TComponent>(state: TestCaseState): TestCaseState {
    return {
      ...state,
      context: {
        ...state.context,
        type: this.value,
      },
    };
  }
}

export class ResetComponent extends ChangeComponent {
  constructor() {
    super(void 0);
  }
}
