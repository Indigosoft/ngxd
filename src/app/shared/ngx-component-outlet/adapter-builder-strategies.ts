import {
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, DoCheck, Injectable, OnInit, Type, ViewContainerRef
} from '@angular/core';

import { NgxComponentOutletAdapterRef } from './adapter-ref';

@Component({
    selector: 'ngx-component-outlet-on-init-only',
    template: ''
})
export class NgxComponentOutletOnInitOnly implements OnInit {

    ngOnInit() {
    }

}

@Component({
    selector: 'ngx-component-outlet-do-check-only',
    template: ''
})
export class NgxComponentOutletDoCheckOnly implements DoCheck {

    ngDoCheck() {
    }

}

@Component({
    selector: 'ngx-component-outlet-on-init-do-check',
    template: ''
})
export class NgxComponentOutletOnInitAndDoCheck implements OnInit, DoCheck {

    ngOnInit() {
    }

    ngDoCheck() {
    }

}

export enum LifeCycleHookStrategyType {
    Default,
    OnInitOnly,
    DoCheckOnly,
    OnInitAndDoCheck
}

export interface NgxComponentOutletAdapterBuilderStrategy {

    create<TComponent>(
        component: Type<TComponent>,
        componentFactory: ComponentFactory<TComponent>,
        componentRef: ComponentRef<TComponent>,
        viewContainerRef: ViewContainerRef,
        context: TComponent
    ): NgxComponentOutletAdapterRef<TComponent>;

}

@Injectable()
export class NgxComponentOutletAdapterBuilderDefaultStrategy implements NgxComponentOutletAdapterBuilderStrategy {

    create<TComponent>(
        component: Type<TComponent>,
        componentFactory: ComponentFactory<TComponent>,
        componentRef: ComponentRef<TComponent>,
        viewContainerRef: ViewContainerRef,
        context: TComponent
    ): NgxComponentOutletAdapterRef<TComponent> {
        return new NgxComponentOutletAdapterRef(componentFactory, componentRef, context);
    }

}

@Injectable()
export class NgxComponentOutletAdapterBuilderOnInitOnlyStrategy implements NgxComponentOutletAdapterBuilderStrategy {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    create<TComponent>(
        component: Type<TComponent>,
        componentFactory: ComponentFactory<TComponent>,
        componentRef: ComponentRef<TComponent>,
        viewContainerRef: ViewContainerRef,
        context: TComponent
    ): NgxComponentOutletAdapterRef<TComponent> {
        const featureComponentFactory: ComponentFactory<NgxComponentOutletOnInitOnly> =
            this.componentFactoryResolver.resolveComponentFactory(NgxComponentOutletOnInitOnly);

        const featureComponentRef: ComponentRef<NgxComponentOutletOnInitOnly> =
            viewContainerRef.createComponent(featureComponentFactory, viewContainerRef.length);

        return new NgxComponentOutletAdapterRef(componentFactory, componentRef, context, featureComponentRef as any);
    }

}

@Injectable()
export class NgxComponentOutletAdapterBuilderDoCheckOnlyStrategy implements NgxComponentOutletAdapterBuilderStrategy {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    create<TComponent>(
        component: Type<TComponent>,
        componentFactory: ComponentFactory<TComponent>,
        componentRef: ComponentRef<TComponent>,
        viewContainerRef: ViewContainerRef,
        context: TComponent
    ): NgxComponentOutletAdapterRef<TComponent> {
        const featureComponentFactory: ComponentFactory<NgxComponentOutletDoCheckOnly> =
            this.componentFactoryResolver.resolveComponentFactory(NgxComponentOutletDoCheckOnly);

        const featureComponentRef: ComponentRef<NgxComponentOutletDoCheckOnly> =
            viewContainerRef.createComponent(featureComponentFactory, viewContainerRef.length);

        return new NgxComponentOutletAdapterRef(componentFactory, componentRef, context, null, featureComponentRef as any);
    }

}

@Injectable()
export class NgxComponentOutletAdapterBuilderOnInitAndDoCheckStrategy implements NgxComponentOutletAdapterBuilderStrategy {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    create<TComponent>(
        component: Type<TComponent>,
        componentFactory: ComponentFactory<TComponent>,
        componentRef: ComponentRef<TComponent>,
        viewContainerRef: ViewContainerRef,
        context: TComponent
    ): NgxComponentOutletAdapterRef<TComponent> {
        const featureComponentFactory: ComponentFactory<NgxComponentOutletOnInitAndDoCheck> =
            this.componentFactoryResolver.resolveComponentFactory(NgxComponentOutletOnInitAndDoCheck);

        const featureComponentRef: ComponentRef<NgxComponentOutletOnInitAndDoCheck> =
            viewContainerRef.createComponent(featureComponentFactory, viewContainerRef.length);

        return new NgxComponentOutletAdapterRef(
            componentFactory, componentRef, context,
            featureComponentRef as any, featureComponentRef as any
        );
    }

}

@Injectable()
export class NgxComponentOutletAdapterBuilderStrategyResolver {

    constructor(
        private defaultStrategy: NgxComponentOutletAdapterBuilderDefaultStrategy,
        private onInitOnlyStrategy: NgxComponentOutletAdapterBuilderOnInitOnlyStrategy,
        private doCheckOnlyStrategy: NgxComponentOutletAdapterBuilderDoCheckOnlyStrategy,
        private onInitAndDoCheckStrategy: NgxComponentOutletAdapterBuilderOnInitAndDoCheckStrategy
    ) {
    }

    resolve(component: Type<any>): NgxComponentOutletAdapterBuilderStrategy {
        const type: LifeCycleHookStrategyType = this.getStrategyType(component);

        switch (type) {

            case LifeCycleHookStrategyType.OnInitOnly:
                return this.onInitOnlyStrategy;

            case LifeCycleHookStrategyType.DoCheckOnly:
                return this.doCheckOnlyStrategy;

            case LifeCycleHookStrategyType.OnInitAndDoCheck:
                return this.onInitAndDoCheckStrategy;

            case LifeCycleHookStrategyType.Default:
            default:
                return this.defaultStrategy;

        }
    }

    private getStrategyType(component: Type<any>) {
        const hasNgOnInit: boolean = component.prototype.hasOwnProperty('ngOnInit');
        const hasNgDoCheck: boolean = component.prototype.hasOwnProperty('ngDoCheck');
        const hasNgOnChanges: boolean = component.prototype.hasOwnProperty('ngOnChanges');

        if (hasNgOnChanges && !hasNgOnInit && !hasNgDoCheck) {
            return LifeCycleHookStrategyType.OnInitAndDoCheck;
        }

        if (hasNgOnChanges && !hasNgOnInit) {
            return LifeCycleHookStrategyType.OnInitOnly;
        }

        if (!hasNgDoCheck) {
            return LifeCycleHookStrategyType.DoCheckOnly;
        }

        return LifeCycleHookStrategyType.Default;
    }

}
