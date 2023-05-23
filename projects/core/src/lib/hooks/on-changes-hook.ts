import {OnChanges, SimpleChanges} from "@angular/core";
import {hasProperty} from "../property-def";

export const SimpleChangesWeakMap = new WeakMap<any, SimpleChanges>();
export const WasChangesBeforeWeakMap = new WeakMap<any, Map<string, true>>();

function hasOnChangesHook(component: unknown): component is OnChanges {
  return component && hasProperty(component, 'ngOnChanges');
}

export function runOnChangesHook(context: unknown): void {
  const simpleChanges = SimpleChangesWeakMap.get(context);

  if (simpleChanges != null && hasOnChangesHook(context)) {
    context.ngOnChanges(simpleChanges);
  }

  SimpleChangesWeakMap.set(context, null);
}
