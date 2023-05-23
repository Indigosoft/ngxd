import { PropertyDef, BindingDef } from './property-def';
import { HostInputManager } from './host-input-manager';

export class HostManager<TComponent> {
  static hostManagerMap = new WeakMap<any, HostManager<any>>();

  inputs: Map<string, HostInputManager<TComponent>>;
  state: any;
  refCount: number;

  constructor(private host: TComponent) {
    if (HostManager.hostManagerMap.has(host)) {
      return HostManager.hostManagerMap.get(host);
    }

    this.inputs = new Map<string, HostInputManager<TComponent>>();
    this.state = {};
    this.refCount = 0;

    HostManager.hostManagerMap.set(host, this);
  }

  attach(): void {
    this.refCount++;
  }

  attachInput(propertyDef: PropertyDef<TComponent>): BindingDef<TComponent> {
    const hostInputManager = new HostInputManager<TComponent>(this.host, propertyDef.outsidePropName);
    hostInputManager.attach();
    this.inputs.set(propertyDef.outsidePropName, hostInputManager);
    return { ...propertyDef, defaultDescriptor: hostInputManager.defaultDescriptor };
  }

  getInputManager(bindingDef: BindingDef<TComponent>): HostInputManager<TComponent> {
    return this.inputs.get(bindingDef.outsidePropName);
  }

  detachInput(bindingDef: BindingDef<TComponent>): void {
    const hostInputManager = this.inputs.get(bindingDef.outsidePropName);
    hostInputManager.detach();

    if (hostInputManager.disposed) {
      this.inputs.delete(bindingDef.outsidePropName);
    }
  }

  detach(): void {
    this.refCount--;

    if (this.refCount <= 0) {
      HostManager.hostManagerMap.delete(this.host);
    }
  }
}
