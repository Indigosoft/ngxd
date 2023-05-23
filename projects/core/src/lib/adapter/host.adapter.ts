import { PropertyDef, PRIVATE_CONTEXT_PREFIX, BindingDef } from '../utils';
import { HostInputAdapter } from './host-input.adapter';

export const PRIVATE_HOST_ADAPTER = PRIVATE_CONTEXT_PREFIX + 'HOST_ADAPTER';

export class HostAdapter<TComponent> {
  inputs: Map<string, HostInputAdapter<TComponent>>;
  state: any;
  refCount: number;

  constructor(private host: TComponent) {
    if (PRIVATE_HOST_ADAPTER in (host as object)) {
      return host[PRIVATE_HOST_ADAPTER];
    }

    this.inputs = new Map<string, HostInputAdapter<TComponent>>();
    this.state = {};
    this.refCount = 0;

    host[PRIVATE_HOST_ADAPTER] = this;
  }

  attach(): void {
    this.refCount++;
  }

  attachInput(propertyDef: PropertyDef<TComponent>): BindingDef<TComponent> {
    const adapter = new HostInputAdapter<TComponent>(this.host, propertyDef.outsidePropName);
    adapter.attach();
    this.inputs.set(propertyDef.outsidePropName, adapter);
    return { ...propertyDef, defaultDescriptor: adapter.defaultDescriptor };
  }

  getInputAdapter(bindingDef: BindingDef<TComponent>): HostInputAdapter<TComponent> {
    return this.inputs.get(bindingDef.outsidePropName);
  }

  detachInput(bindingDef: BindingDef<TComponent>): void {
    const adapter = this.inputs.get(bindingDef.outsidePropName);
    adapter.detach();

    if (adapter.disposed) {
      this.inputs.delete(bindingDef.outsidePropName);
    }
  }

  detach(): void {
    this.refCount--;

    if (this.refCount <= 0) {
      this.dispose();
    }
  }

  private dispose(): void {
    delete this.host[PRIVATE_HOST_ADAPTER];
  }
}
