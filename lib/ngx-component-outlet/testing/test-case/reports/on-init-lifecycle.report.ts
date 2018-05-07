import { ContextState } from '../test-case.interfaces';
import { SimpleLifecycleReport } from './simple-lifecycle.report';

export class OnInitLifecycleReport extends SimpleLifecycleReport {
    constructor() { super('ngOnInit'); }

    canReport<TComponent>(oldState: ContextState, newState: ContextState): boolean {
        if (!super.canReport(oldState, newState)) {
            return false;
        }

        return this.componentIsChanged(oldState, newState);
    }

    protected componentIsChanged(oldState: ContextState, newState: ContextState): boolean {
        return !!(oldState.type !== newState.type && newState.type);
    }
}
