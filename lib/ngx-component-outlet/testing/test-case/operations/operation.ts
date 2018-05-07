import { ComponentFixture } from '@angular/core/testing';
import { Executable, LifecycleReport, LifecycleState, TestCaseState } from '../test-case.interfaces';
import { LIFECYCLE_REPORTS } from '../reports';

export class Operation extends Executable {
    private reports: LifecycleReport[] = LIFECYCLE_REPORTS;

    constructor(protected operations: Executable[]) { super(); }

    execute<TComponent>(fixture: ComponentFixture<TComponent>) {
        this.operations.forEach((operation) => operation.execute(fixture));
        fixture.detectChanges();
        this.expect(fixture);
    }

    report<TComponent>(oldState: TestCaseState): TestCaseState {
        const newState = this.operations.reduce((acc, operation) => operation.report(acc), oldState);
        const report = this.makeReport(oldState, newState);

        return { ...newState, lifecycle: [ ...oldState.lifecycle, ...report ] };
    }

    private expect<TComponent extends any>(fixture: ComponentFixture<TComponent>) {
        const content: string = fixture.nativeElement.innerHTML;
        const component: TComponent = fixture.componentInstance;

        if (component.component) {
            expect(content).toContain(`component: ${component.component.constructor.prototype.name}`);

            if (component.name) {
                expect(content).toContain(`name: ${component.name}`);
            } else {
                expect(content).not.toContain(`name: ${component.name}`);
            }

            if (component.label) {
                expect(content).toContain(`label: ${component.label}`);
            } else {
                expect(content).not.toContain(`label: ${component.label}`);
            }
        } else {
            expect(content).not.toContain(`name: ${component.name}`);
            expect(content).not.toContain(`label: ${component.label}`);
        }
    }

    private makeReport<TComponent>(oldState: TestCaseState, newState: TestCaseState): LifecycleState[] {
        return this.reports.filter((reportMaker) =>
                       reportMaker.canReport(oldState.context, newState.context))
                   .map((reportMaker) =>
                       reportMaker.report(oldState.context, newState.context));
    }
}
