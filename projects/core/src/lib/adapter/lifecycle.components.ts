import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { runOnChangesHook } from '../utils';

const lifeCycleComponentSymbol = Symbol('Life Cycle Component');

interface LifeCycleComponent {
  [lifeCycleComponentSymbol]: boolean;

  attach(context: unknown, changeDetectorRef: ChangeDetectorRef): void;
}

export function isLifecycleComponent(component: unknown): component is LifeCycleComponent {
  return component && component[lifeCycleComponentSymbol];
}

@Component({
  selector: 'ngx-component-outlet-on-init-only',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnInitOnlyComponent implements LifeCycleComponent, OnInit {
  [lifeCycleComponentSymbol] = true;

  private context: unknown;
  private changeDetectorRef: ChangeDetectorRef;

  ngOnInit() {
    if (this.context) {
      runOnChangesHook(this.context);
    }
  }

  attach(context: unknown, changeDetectorRef: ChangeDetectorRef): void {
    this.context = context;
    this.changeDetectorRef = changeDetectorRef;
  }
}

@Component({
  selector: 'ngx-component-outlet-do-check-only',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoCheckOnlyComponent implements LifeCycleComponent, DoCheck {
  [lifeCycleComponentSymbol] = true;

  private context: unknown;
  private changeDetectorRef: ChangeDetectorRef;

  ngDoCheck() {
    if (this.context) {
      runOnChangesHook(this.context);
    }

    if (this.changeDetectorRef) {
      this.changeDetectorRef.markForCheck();
    }
  }

  attach(context: unknown, changeDetectorRef: ChangeDetectorRef): void {
    this.context = context;
    this.changeDetectorRef = changeDetectorRef;
  }
}

@Component({
  selector: 'ngx-component-outlet-on-init-do-check',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnInitAndDoCheckComponent implements LifeCycleComponent, OnInit, DoCheck {
  [lifeCycleComponentSymbol] = true;

  private context: unknown;
  private changeDetectorRef: ChangeDetectorRef;

  ngOnInit() {
    if (this.context) {
      runOnChangesHook(this.context);
    }
  }

  ngDoCheck() {
    if (this.context) {
      runOnChangesHook(this.context);
    }

    if (this.changeDetectorRef) {
      this.changeDetectorRef.markForCheck();
    }
  }

  attach(context: unknown, changeDetectorRef: ChangeDetectorRef): void {
    this.context = context;
    this.changeDetectorRef = changeDetectorRef;
  }
}
