import { Subject } from 'rxjs';
import { getPropertyDescriptor, PRIVATE_CONTEXT_PREFIX } from '../utils';

export const PRIVATE_HOST_INPUT_ADAPTER = PRIVATE_CONTEXT_PREFIX + 'HOST_INPUT_ADAPTER';

export class HostInputAdapter<TComponent> {
  changes: Subject<any>;
  defaultDescriptor: PropertyDescriptor;
  value: any;
  refCount: number;
  disposed = false;

  constructor(private host: TComponent, private name: string) {
    if (PRIVATE_HOST_INPUT_ADAPTER + name in host) {
      return host[PRIVATE_HOST_INPUT_ADAPTER + name];
    }

    host[PRIVATE_HOST_INPUT_ADAPTER + name] = this;

    this.changes = new Subject<any>();
    this.defaultDescriptor = getPropertyDescriptor(host, name);
    this.refCount = 0;

    const defaultValue = host[name];

    Object.defineProperty(host, name, {
      get: () => {
        if (this.defaultDescriptor && this.defaultDescriptor.get) {
          return this.defaultDescriptor.get.call(host);
        }
        return this.value;
      },
      set: (value: any) => {
        if (this.defaultDescriptor && this.defaultDescriptor.set) {
          this.defaultDescriptor.set.call(host, value);
        }

        this.value = value;
        this.changes.next(value);
      },
    });

    if (typeof defaultValue !== 'undefined') {
      host[name] = defaultValue;
    }
  }

  attach(): void {
    this.refCount++;
  }

  detach(): void {
    this.refCount--;

    if (this.refCount <= 0) {
      this.dispose();
    }
  }

  private dispose(): void {
    const defaultValue = this.host[this.name];

    this.disposed = true;
    this.changes.complete();
    delete this.host[PRIVATE_HOST_INPUT_ADAPTER + this.name];

    if (this.defaultDescriptor) {
      if (this.defaultDescriptor.writable) {
        this.defaultDescriptor.value = defaultValue;
      }
      Object.defineProperty(this.host, this.name, this.defaultDescriptor);
      if (this.defaultDescriptor.set) {
        this.host[this.name] = defaultValue;
      }
    } else {
      delete this.host[this.name];
      this.host[this.name] = defaultValue;
    }
  }
}
