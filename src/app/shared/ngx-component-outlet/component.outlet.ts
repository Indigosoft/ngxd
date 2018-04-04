import {
    ChangeDetectorRef, Directive, EmbeddedViewRef, Injector, Input, NgModuleFactory, OnChanges, OnDestroy, SimpleChanges, Type,
    ViewContainerRef
} from '@angular/core';

import { NgxComponentOutletAdapterBuilder } from './adapter-builder';
import { NgxComponentOutletAdapterRef } from './adapter-ref';

@Directive({
    selector: '[ngxComponentOutlet]',
    providers: [
        NgxComponentOutletAdapterBuilder
    ]
})
export class NgxComponentOutlet implements OnChanges, OnDestroy {

    @Input() ngxComponentOutlet: Type<any>;
    @Input() ngxComponentOutletInjector: Injector;
    @Input() ngxComponentOutletContent: any[][];
    @Input() ngxComponentOutletNgModuleFactory: NgModuleFactory<any>;

    private adapterRef: NgxComponentOutletAdapterRef<any>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private builder: NgxComponentOutletAdapterBuilder
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.ngxComponentOutlet) {
            const injector: Injector = this.ngxComponentOutletInjector || this.viewContainerRef.injector;
            const changeDetectorRef: EmbeddedViewRef<any> = injector.get(ChangeDetectorRef) as EmbeddedViewRef<any>;
            const context: any = changeDetectorRef.context;

            if (this.adapterRef) {
                this.adapterRef.dispose();
                this.adapterRef = null;
            }

            this.adapterRef = this.builder.create(
                this.ngxComponentOutlet, this.viewContainerRef, injector,
                this.ngxComponentOutletContent, context
            );
        }
    }

    ngOnDestroy() {
        if (this.adapterRef) {
            this.adapterRef.dispose();
            this.adapterRef = null;
        }
    }

}
