import {
    ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, SimpleChanges, Type, ViewContainerRef
} from '@angular/core';
import { ComponentAdapterRef } from './adapter-ref';

@Injectable()
export class ComponentPresenter {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    init<TComponent>(
        parent: TComponent,
        components: Type<TComponent>[],
        viewContainerRef: ViewContainerRef,
        injector?: Injector,
        projectableNodes?: any[][]
    ): ComponentAdapterRef<TComponent>[] {
        return components.map((component: Type<TComponent>) => {
            const componentFactory: ComponentFactory<TComponent> =
                this.componentFactoryResolver.resolveComponentFactory(component);

            const componentRef: ComponentRef<TComponent> =
                viewContainerRef.createComponent(
                    componentFactory,
                    viewContainerRef.length,
                    injector,
                    projectableNodes
                );

            const componentAdapterRef: ComponentAdapterRef<TComponent> =
                new ComponentAdapterRef(componentFactory, componentRef);

            componentAdapterRef.attachOutputs(parent);

            return componentAdapterRef;
        });
    }

    changes<TComponent>(componentAdapterRefs: ComponentAdapterRef<TComponent>[], changes: SimpleChanges) {
        componentAdapterRefs.forEach((componentAdapterRef: ComponentAdapterRef<TComponent>) =>
            componentAdapterRef.attachInputs(changes));
    }

    dispose<TComponent>(adapters: ComponentAdapterRef<TComponent>[]) {
        if (adapters) {
            adapters.forEach((componentAdapterRef: ComponentAdapterRef<TComponent>) => componentAdapterRef.dispose());
        }
    }

}
