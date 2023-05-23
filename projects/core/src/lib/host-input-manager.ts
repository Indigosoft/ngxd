import { isDevMode } from '@angular/core';
import { Subject } from 'rxjs';
import { getPropertyDescriptor } from './property-def';

export class HostInputManager<TComponent> {
  static hostInputManagerMap = new WeakMap<any, Map<string, HostInputManager<any>>>();

  changes: Subject<any>;
  defaultDescriptor: PropertyDescriptor;
  value: any;
  refCount: number;
  disposed = false;

  constructor(private host: TComponent, private name: string) {
    if (HostInputManager.hostInputManagerMap.has(host)) {
      const inputs = HostInputManager.hostInputManagerMap.get(host);
      if (inputs.has(name)) {
        return inputs.get(name);
      }
    }

    if (!HostInputManager.hostInputManagerMap.has(host)) {
      HostInputManager.hostInputManagerMap.set(host, new Map<string, HostInputManager<any>>());
    }
    HostInputManager.hostInputManagerMap.get(host).set(name, this);

    this.changes = new Subject<any>();
    this.defaultDescriptor = getPropertyDescriptor(host, name);

    if (this.defaultDescriptor && this.defaultDescriptor.get && !this.defaultDescriptor.set) {
      if (isDevMode()) {
        const constructorName = (host as any).constructor.name;
        console.log(`You should use get and set descriptors both with dynamic components:
ERROR: not found '${name}' input, it has setter only, please add getter!

  class ${constructorName} {

    // Please add that 👇
    get ${name}() { ... }

    set ${name}() { ... }

  }`);
      }
    }
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
      configurable: true,
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
    HostInputManager.hostInputManagerMap.get(this.host).delete(this.name);

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
