import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DoCheck,
  ViewContainerRef,
} from '@angular/core';
import {Disposable} from '../property-def';
import {runOnChangesHook} from "./on-changes-hook";

@Component({
  selector: 'ngxd-do-check-hook',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoCheckHook implements DoCheck {
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

  attach<TComponent>(componentRef: ComponentRef<TComponent>): void {
    this.context = componentRef.instance;
    this.changeDetectorRef = componentRef.changeDetectorRef;
  }

  static attach<TComponent>(
    componentRef: ComponentRef<TComponent>,
    viewContainerRef: ViewContainerRef,
  ): Disposable {
    const doCheckComponentRef = viewContainerRef.createComponent(DoCheckHook);

    doCheckComponentRef.instance.attach(componentRef);

    return () => doCheckComponentRef.destroy();
  }
}
