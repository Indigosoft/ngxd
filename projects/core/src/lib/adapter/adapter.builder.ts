import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { NgxComponentOutletAdapterRef } from './adapter-ref';

/**
 * @deprecated
 */
@Injectable()
export class NgxComponentOutletAdapterBuilder {
  create<TComponent>(
    componentType: Type<TComponent>,
    viewContainerRef: ViewContainerRef,
    injector: Injector,
    projectableNodes: any[][],
    host: TComponent,
    componentFactoryResolver: ComponentFactoryResolver
  ): NgxComponentOutletAdapterRef<TComponent> {
    const componentFactory: ComponentFactory<
      TComponent
    > = componentFactoryResolver.resolveComponentFactory(componentType);

    const componentRef: ComponentRef<TComponent> = componentFactory.create(
      injector,
      projectableNodes
    );

    const adapterRef = new NgxComponentOutletAdapterRef(
      {
        componentFactory,
        componentRef,
        host,
      },
      viewContainerRef,
      componentFactoryResolver
    );

    viewContainerRef.insert(componentRef.hostView, viewContainerRef.length);

    return adapterRef;
  }
}
