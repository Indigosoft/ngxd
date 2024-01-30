import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChange,
  SimpleChanges,
  Type,
  ViewContainerRef,
} from '@angular/core';

import {NgxComponentOutletRef} from './ngx-component-outlet-ref';
import { runOnChangesHook } from './hooks/on-changes-hook';

@Directive({selector: '[ngxComponentOutlet]'})
export class NgxComponentOutletDirective implements OnChanges, OnDestroy {
  @Input() ngxComponentOutlet: Type<any> | null;
  @Input() ngxComponentOutletInjector: Injector | null;
  @Input() ngxComponentOutletContent: any[][] | null;
  @Input() ngxComponentOutletContext: any | null;

  @Output() ngxComponentOutletActivate = new EventEmitter<any>();
  @Output() ngxComponentOutletDeactivate = new EventEmitter<any>();

  private ngxComponentOutletRef: NgxComponentOutletRef<any>;

  private _host: any;

  private get host(): any {
    if (this._host) {
      return this._host;
    }

    const {context} = this.changeDetectorRef as EmbeddedViewRef<any>;

    return (this._host = context);
  }

  private get injector(): Injector {
    return this.ngxComponentOutletInjector || this.viewContainerRef.injector;
  }

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ngxComponentOutlet || changes.ngxComponentOutletInjector) {
      this.destroyNgxComponentOutletRef();
      this.createNgxComponentOutletRef();
    }

    if (changes.ngxComponentOutletContext) {
      this.updateContext();
    }
  }

  ngDoCheck() {
    if (this.ngxComponentOutletRef?.componentRef) {
      runOnChangesHook(this.ngxComponentOutletRef.componentRef.instance);
    }
  }

  ngOnDestroy() {
    this.destroyNgxComponentOutletRef();
  }

  private updateContext() {
    if (this.ngxComponentOutletRef) {
      this.ngxComponentOutletRef.updateContext(this.ngxComponentOutletContext);
    }
  }

  private createNgxComponentOutletRef() {
    if (this.ngxComponentOutlet) {
      this.ngxComponentOutletRef = NgxComponentOutletRef.create(
        this.ngxComponentOutlet,
        this.viewContainerRef,
        this.injector,
        this.ngxComponentOutletContent,
        this.host,
      );
      if (this.ngxComponentOutletContext) {
        this.updateContext();
      }
      this.ngxComponentOutletActivate.emit(this.ngxComponentOutletRef.componentRef.instance);
    }
  }

  private destroyNgxComponentOutletRef() {
    if (this.ngxComponentOutletRef) {
      this.ngxComponentOutletDeactivate.emit(this.ngxComponentOutletRef.componentRef.instance);
      this.ngxComponentOutletRef.dispose();
      this.ngxComponentOutletRef = null;
    }
  }
}
