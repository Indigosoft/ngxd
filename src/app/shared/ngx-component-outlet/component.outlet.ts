import {
    ChangeDetectorRef, ComponentFactoryResolver, Directive, EmbeddedViewRef, Injector, Input, NgModuleFactory, NgModuleRef, OnChanges,
    OnDestroy, SimpleChanges, Type,
    ViewContainerRef
} from '@angular/core';

import { NgxComponentOutletAdapterBuilder } from './adapter-builder';
import { NgxComponentOutletAdapterRef } from './adapter-ref';

@Directive({ selector: '[ngxComponentOutlet]' })
export class NgxComponentOutlet implements OnChanges, OnDestroy {

    @Input() ngxComponentOutlet: Type<any>;
    @Input() ngxComponentOutletInjector: Injector;
    @Input() ngxComponentOutletContent: any[][];
    @Input() ngxComponentOutletNgModuleFactory: NgModuleFactory<any>;

    private adapterRef: NgxComponentOutletAdapterRef<any>;
    private ngModuleRef: NgModuleRef<any>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private builder: NgxComponentOutletAdapterBuilder
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.ngxComponentOutlet) {
            const injector: Injector = this.ngxComponentOutletInjector || this.viewContainerRef.injector;
            const changeDetectorRef: EmbeddedViewRef<any> = injector.get(ChangeDetectorRef) as EmbeddedViewRef<any>;
            const context: any = changeDetectorRef.context;

            if (changes.ngxComponentOutletNgModuleFactory) {
                if (this.ngModuleRef) {
                    this.ngModuleRef.destroy();
                    this.ngModuleRef = null;
                }

                if (this.ngxComponentOutletNgModuleFactory) {
                    this.ngModuleRef = this.ngxComponentOutletNgModuleFactory.create(injector);
                }
            }

            const componentFactoryResolver: ComponentFactoryResolver =
                this.ngModuleRef ? this.ngModuleRef.componentFactoryResolver : this.componentFactoryResolver;

            if (this.adapterRef) {
                this.adapterRef.dispose();
                this.adapterRef = null;
            }

            this.adapterRef = this.builder.create(
                this.ngxComponentOutlet, this.viewContainerRef, injector,
                this.ngxComponentOutletContent, context, componentFactoryResolver
            );
        }
    }

    ngOnDestroy() {
        if (this.adapterRef) {
            this.adapterRef.dispose();
        }

        if (this.ngModuleRef) {
            this.ngModuleRef.destroy();
        }
    }

}
