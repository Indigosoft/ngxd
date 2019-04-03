import { PropertyDef, PRIVATE_CONTEXT_PREFIX } from '../utils';
import { HostInputAdapter } from './host-input.adapter';

export const PRIVATE_HOST_ADAPTER = PRIVATE_CONTEXT_PREFIX + 'HOST_ADAPTER';

export class HostAdapter<TComponent> {
    inputs: Map<string, HostInputAdapter<TComponent>>;
    state: any;
    refCount: number;

    constructor(private host: TComponent) {
        if (PRIVATE_HOST_ADAPTER in host) {
            return host[ PRIVATE_HOST_ADAPTER ];
        }

        this.inputs = new Map<string, HostInputAdapter<TComponent>>();
        this.state = {};
        this.refCount = 0;

        host[ PRIVATE_HOST_ADAPTER ] = this;
    }

    attach(): void {
        this.refCount++;
    }

    attachInput(propertyDef: PropertyDef): HostInputAdapter<TComponent> {
        const adapter = new HostInputAdapter<TComponent>(this.host, propertyDef.outsidePropName);
        adapter.attach();
        this.inputs.set(propertyDef.outsidePropName, adapter);
        return adapter;
    }

    getInputAdapter(propertyDef: PropertyDef): HostInputAdapter<TComponent> {
        return this.inputs.get(propertyDef.outsidePropName);
    }

    detachInput(propertyDef: PropertyDef): void {
        const adapter = this.inputs.get(propertyDef.outsidePropName);
        adapter.detach();

        if (adapter.disposed) {
            this.inputs.delete(propertyDef.outsidePropName);
        }
    }

    detach(): void {
        this.refCount--;

        if (this.refCount <= 0) {
            this.dispose();
        }
    }

    private dispose(): void {
        delete this.host[ PRIVATE_HOST_ADAPTER ];
    }
}
