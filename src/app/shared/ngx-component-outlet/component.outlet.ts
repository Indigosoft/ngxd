import {
    ChangeDetectorRef, ComponentFactoryResolver, Directive, EmbeddedViewRef, Injector, Input, NgModuleFactory, NgModuleRef, OnChanges,
    OnDestroy, SimpleChanges, Type, ViewContainerRef
} from '@angular/core';

import { NgxComponentOutletAdapterBuilder } from './adapter/adapter-builder';
import { NgxComponentOutletAdapterRef } from './adapter/adapter-ref';

@Directive({ selector: '[ngxComponentOutlet]' })
export class NgxComponentOutlet implements OnChanges, OnDestroy {

    @Input() ngxComponentOutlet: Type<any>;
    @Input() ngxComponentOutletInjector: Injector;
    @Input() ngxComponentOutletContent: any[][];
    @Input() ngxComponentOutletNgModuleFactory: NgModuleFactory<any>;

    private _adapterRef: NgxComponentOutletAdapterRef<any>;
    private _ngModuleRef: NgModuleRef<any>;

    private get componentFactoryResolver(): ComponentFactoryResolver {
        return this._ngModuleRef ? this._ngModuleRef.componentFactoryResolver : this._componentFactoryResolver;
    }

    private get context(): any {
        const { context } = this.injector.get(ChangeDetectorRef) as EmbeddedViewRef<any>;

        return context;
    }

    private get injector(): Injector {
        return this.ngxComponentOutletInjector || this.viewContainerRef.injector;
    }

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private builder: NgxComponentOutletAdapterBuilder
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.ngxComponentOutlet) {
            if (changes.ngxComponentOutletNgModuleFactory) {
                this.destroyNgModuleRef();
                this.createNgModuleRef();
            }

            this.destroyAdapterRef();
            this.createAdapterRef();
        }
    }

    ngOnDestroy() {
        this.destroyAdapterRef();
        this.destroyNgModuleRef();
    }

    private createAdapterRef() {
        if (this.ngxComponentOutlet) {
            this._adapterRef = this.builder.create(
                this.ngxComponentOutlet, this.viewContainerRef, this.injector,
                this.ngxComponentOutletContent, this.context, this.componentFactoryResolver
            );
        }
    }

    private destroyAdapterRef() {
        if (this._adapterRef) {
            this._adapterRef.dispose();
            this._adapterRef = null;
        }
    }

    private createNgModuleRef() {
        if (this.ngxComponentOutletNgModuleFactory) {
            this._ngModuleRef = this.ngxComponentOutletNgModuleFactory.create(this.injector);
        }
    }

    private destroyNgModuleRef() {
        if (this._ngModuleRef) {
            this._ngModuleRef.destroy();
            this._ngModuleRef = null;
        }
    }

}
