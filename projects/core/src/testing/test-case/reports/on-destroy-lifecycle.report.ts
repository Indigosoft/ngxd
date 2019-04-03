import { hasProperty } from '../../../lib/utils/index';
import { ContextState, LifecycleState } from '../test-case.interfaces';
import { SimpleLifecycleReport } from './simple-lifecycle.report';

export class OnDestroyLifecycleReport extends SimpleLifecycleReport {
  constructor() {
    super('ngOnDestroy');
  }

  canReport<TComponent>(oldState: ContextState, newState: ContextState): boolean {
    if (!(oldState.type && hasProperty(oldState.type.prototype, this.name))) {
      return false;
    }

    return this.componentIsChanged(oldState, newState);
  }

  report<TComponent>(oldState: ContextState, newState: ContextState): LifecycleState {
    return {
      ctor: oldState.type,
      name: this.name,
      state: { name: oldState.dynamic.name, label: oldState.dynamic.label },
      changes: void 0,
    };
  }

  protected componentIsChanged(oldState: ContextState, newState: ContextState): boolean {
    return !!(oldState.type !== newState.type && oldState.type);
  }
}
