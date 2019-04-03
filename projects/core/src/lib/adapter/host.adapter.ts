import { PRIVATE_CONTEXT_PREFIX } from '../utils';
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

    attach() {
        this.refCount++;
    }

    attachInput(name) {
        const adapter = new HostInputAdapter<TComponent>(this.host, name);
        adapter.attach();
        this.inputs.set(name, adapter);
    }

    getInputAdapter(name): HostInputAdapter<TComponent> {
        return this.inputs.get(name);
    }

    detachInput(name) {
        const adapter = this.inputs.get(name);
        adapter.detach();

        if (adapter.disposed) {
            this.inputs.delete(name);
        }
    }

    detach() {
        this.refCount--;

        if (this.refCount <= 0) {
            this.dispose();
        }
    }

    private dispose() {
        delete this.host[ PRIVATE_HOST_ADAPTER ];
    }
}
