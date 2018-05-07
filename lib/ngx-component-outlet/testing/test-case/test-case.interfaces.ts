import { SimpleChanges, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export interface ComponentState {
    name: string;
    label: string;
}

export interface ContextState {
    host: ComponentState;
    dynamic: ComponentState;
    type: Type<any>;
}

export interface LifecycleState {
    ctor: Type<any>;
    name: string;
    state: ComponentState;
    changes?: SimpleChanges;
}

export interface TestCaseState {
    context: ContextState;
    lifecycle: LifecycleState[];
}

export abstract class Executable {
    abstract execute(fixture: ComponentFixture<any>);

    abstract report(state: TestCaseState): TestCaseState;
}

export abstract class LifecycleReport {
    abstract canReport<TComponent>(oldState: ContextState, newState: ContextState): boolean;

    abstract report<TComponent>(oldState: ContextState, newState: ContextState): LifecycleState;
}
