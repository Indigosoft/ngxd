import { ChangeDetectionStrategy } from '@angular/core';
import { hasProperty } from '../../../lib/property-def';
import { ContextState, LifecycleReport, LifecycleState } from '../test-case.interfaces';

export class SimpleLifecycleReport extends LifecycleReport {
  constructor(protected name: string) {
    super();
  }

  canReport<TComponent>(oldState: ContextState, newState: ContextState): boolean {
    if(!newState.type || !hasProperty(newState.type.prototype, this.name)) {
      return false;
    }
    const hasChanged = oldState.dynamic.name !== newState.dynamic.name ||
      oldState.dynamic.label !== newState.dynamic.label;
    // Angular deals with onPush components differently, so we need to check for that
    // - When onPush is set, the value never calls setter or otherwise makes changes
    //   if the Input doesn't change.
    const onPush = newState.type && (newState.type as unknown as {ɵcmp: {onPush: boolean}}).ɵcmp.onPush;
    if(onPush && !hasChanged) {
      return false;
    }
    return true;
  }

  report<TComponent>(oldState: ContextState, newState: ContextState): LifecycleState {
    return {
      ctor: newState.type,
      name: this.name,
      state: { name: newState.dynamic.name, label: newState.dynamic.label },
      changes: void 0,
    };
  }
}
