import { SimpleChange } from '@angular/core';
import { ContextState, LifecycleState } from '../test-case.interfaces';
import { SimpleLifecycleReport } from './simple-lifecycle.report';

export class OnChangesLifecycleReport extends SimpleLifecycleReport {
    constructor() { super('ngOnChanges'); }

    canReport<TComponent>(oldState: ContextState, newState: ContextState): boolean {
        if (!super.canReport(oldState, newState)) {
            return false;
        }

        if (this.componentIsChanged(oldState, newState)) {
            return true;
        }

        return oldState.dynamic.name !== newState.dynamic.name
            || oldState.dynamic.label !== newState.dynamic.label;
    }

    report<TComponent>(oldState: ContextState, newState: ContextState): LifecycleState {
        const report: LifecycleState = super.report(oldState, newState);

        if (this.componentIsChanged(oldState, newState)) {
            return {
                ...report, changes: {
                    name: new SimpleChange(void 0, newState.dynamic.name, true),
                    label: new SimpleChange(void 0, newState.dynamic.label, true)
                }
            };
        }

        const changes: any = {};

        if (oldState.dynamic.name !== newState.dynamic.name) {
            changes.name = new SimpleChange(oldState.dynamic.name, newState.dynamic.name, false);
        }

        if (oldState.dynamic.label !== newState.dynamic.label) {
            changes.label = new SimpleChange(oldState.dynamic.label, newState.dynamic.label, false);
        }

        return { ...report, changes };
    }

    protected componentIsChanged(oldState: ContextState, newState: ContextState): boolean {
        return !!(oldState.type !== newState.type && newState.type);
    }
}
