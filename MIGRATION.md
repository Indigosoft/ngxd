# NGX Dynamic v0.x to v7 Update Guide
 
NGX Dynamic v7 will arriving soon! While this is a major version change (from 0.x to 7.x).

## Backwards compatibility

NGX Dynamic fully supports the old version.
But we strongly recommend that you use new ways of automatic component binding.
The old way will probably not be supported anymore.

## New Features

### Auto Binding Component Context

Now NGX Dynamic makes the context of the component binding automatically.
You no longer need to specify all inputs and all outputs for your dynamic component.

```html
<!-- host component -->
<app-dynamic
    <!-- dynamic component -->
    [ngxComponentOutlet]="component"
    <!-- regular input -->
    [entity]="entity"
    <!-- regular output -->
    (action)="onAction($event)"
></app-dynamic>
```

becomes

```html
<ng-container *ngxComponentOutlet="component"></ng-container>
```

### Auto Binding Template Context

Support for custom context has been added. It can be used with `*ngFor` directive.
Context has a higher priority than the inputs in the component.
See an example:
```html
<ng-container *ngFor=“let color of colors”
  <ng-container
    *ngxComponentOutlet="
      component;
      context: { color: color }
  ”></ng-container>
</ng-container>
```

### ResolvePipe, NgxdResolver, NgxdProvider

Now working with the dynamics will be easier!

Detailed documentation on them will be published later.

## Breaking changes

### NgxdModule and @ngxd/core

Use `@ngxd/core` instead of the `ngx-component-outlet` package.

And replace module imports.
```typescript
import { NgxComponentOutletModule } from 'ngx-component-outlet';

@NgModule({
    imports: [
        NgxComponentOutletModule.forRoot(),
        // or
        NgxComponentOutletModule.forChild()
    ]
})
```

Becomes
```typescript
import { NgxdModule } from '@ngxd/core';

@NgModule({
    imports: [
        NgxdModule
    ]
})
```

### Don't use manual bindings.

Using dynamic components through manual binding is an outdated way to use the directive.
```html
<!-- host component -->
<app-dynamic
    <!-- dynamic component -->
    [ngxComponentOutlet]="component"
    <!-- regular input -->
    [entity]="entity"
    <!-- regular output -->
    (action)="onAction($event)"
></app-dynamic>
```

### Use `*ngxComponentOutlet` via `ng-container`.

It is not recommended to use the directive on anything other than ng-container.
