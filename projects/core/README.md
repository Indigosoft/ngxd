# ✨🦊 NGX Dynamic for Angular Ivy and Angular 7, 8, 9+

<p align="center">
  <img src="https://github.com/IndigoSoft/ngxd/raw/master/images/ngxd-5-minutes.png" width="882px" alt="preview">
</p>

> 🥳 Best way to quickly use Dynamic Components with [Angular](https://angular.io/)

[![Npm](https://img.shields.io/npm/v/@ngxd/core.svg?style=flat-square&maxAge=300)](https://www.npmjs.com/package/@ngxd/core)
[![Npm Downloads](https://img.shields.io/npm/dt/@ngxd/core.svg?style=flat-square&maxAge=300)](https://www.npmjs.com/package/@ngxd/core)
[![Npm Downloads Weekly](https://img.shields.io/npm/dw/@ngxd/core.svg?style=flat-square&maxAge=300)](https://www.npmjs.com/package/@ngxd/core)
[![Travis](https://img.shields.io/travis/com/IndigoSoft/ngxd.svg?style=flat-square&maxAge=300)](https://travis-ci.com/IndigoSoft/ngxd)
[![Licence](https://img.shields.io/npm/l/@ngxd/core.svg?style=flat-square&maxAge=300)](https://github.com/IndigoSoft/ngxd/blob/master/LICENSE)

[![GitHub Contributors](https://img.shields.io/github/contributors/IndigoSoft/ngxd.svg?style=flat-square&maxAge=300)](https://github.com/IndigoSoft/ngxd/graphs/contributors)
[![GitHub PR](https://img.shields.io/github/issues-pr/IndigoSoft/ngxd.svg?style=flat-square&maxAge=300)](https://github.com/IndigoSoft/ngxd/pulls)
[![GitHub Issue](https://img.shields.io/github/issues/IndigoSoft/ngxd.svg?style=flat-square&maxAge=300)](https://github.com/IndigoSoft/ngxd/issues)
[![GitHub Stars](https://img.shields.io/github/stars/IndigoSoft/ngxd.svg?style=flat-square&label=GitHub%20Stars&maxAge=300)](https://github.com/IndigoSoft/ngxd)

Use like ```NgComponentOutlet``` but with ```@Input/@Output``` auto bindings:

```html
<ng-container *ngxComponentOutlet="component"></ng-container>
```

Here is a [demo example](https://stackblitz.com/edit/angular-simple-dynamic) showing NGX Dynamic and Angular in action.

## Dynamic Components In 5 minutes

There are several modes of operation of the directive.

### Through The Parent Component
A simple variant of binding through the parent component.
```typescript
@Component({
  template: `
    <ng-container
      *ngxComponentOutlet="component"></ng-container>`
      // using @ngxd/core 👆
})
class MyComponent {
  // 🥳 inputs and outputs will binding automatically
  @Input() entity;
  @Output() action;
  
  // your dynamic component 👇
  component = DynamicComponent;
}
```

### Through The Context (please, use auto-binding like above)
Additionally there is autobinding through the context. This is useful when you need to display something through *ngFor. Context has a higher priority than the inputs in the component.
```html
<ng-container *ngFor=“let color of colors”
  <ng-container
    *ngxComponentOutlet="
      component;
      context: { color: color }"></ng-container>
</ng-container>
```

### Pipe For Selecting The Component
For ease of selecting the required component, there is ResolvePipe, which expects NgxdResolver to enter, and returns the required component.
```html
<ng-container
  *ngxComponentOutlet="
    resolver | resolve: entity"></ng-container>
```

### Through The Host Component (deprecated, please, use auto-binding like above)
Through the host component, when the inputs and outputs are initialized explicitly. This option is difficult to use and deprecated.
```html
<!-- host component -->
<app-dynamic
    <!-- dynamic component -->
    [ngxComponentOutlet]="component"
    <!-- regular input -->
    [entity]="entity"
    <!-- regular output -->
    (action)="onAction($event)">
</app-dynamic>
```

## Comparison

| Feature                | NgxComponentOutlet | ComponentFactoryResolver | NgComponentOutlet |
| ---------------------- | ------------------ | ------------------------ | ----------------- |
| Friendliness           |  ⭐⭐⭐            | ⭐                       | ⭐⭐              |
| Dynamic Components     |  ✅                | ✅                       | ✅                |
| AOT support            |  ✅                | ✅                       | ✅                |
| Reactivity             |  ✅                | ✅                       | ✅                |
| Injector               |  ✅                | ✅                       | ✅                |
| NgModule               |  ✅                | ✅                       | ✅                |
| projectionNodes        |  ✅                | ✅                       | ✅                |
| Component Access       |  ✅                | ✅                       | ❌                |
| Lifecycle OnChanges    |  ✅                | ⭕️ manually              | ❌                |
| Binding ```@Input()``` |  ✅                | ⭕️ manually              | ❌                |
| Binding ```@Output()```|  ✅                | ⭕️ manually              | ❌                |
| Activate Event         |  ✅                | ⭕️ manually              | ❌                |
| Deactivate Event       |  ✅                | ⭕️ manually              | ❌                |

## Getting started

### Step 1: Install ```@ngxd/core```:

```bash
npm install --save @ngxd/core
# or
yarn add @ngxd/core
```

### Step 2: Import the NgxdModule:

```typescript
import { NgxdModule } from '@ngxd/core';

@NgModule({
  declarations: [ AppComponent ],
  // have import NgxdModule here 👇
  imports: [ BrowserModule, NgxdModule ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

### Step 3: Use NgxComponentOutlet directly:

```typescript
@Component({
  template: `
    <ng-container
      *ngxComponentOutlet="component"></ng-container>`
      // using @ngxd/core 👆
})
class MyComponent {
  // 🥳 inputs and outputs will binding automatically
  @Input() entity;
  @Output() action;
  
  // your dynamic component 👇
  component = DynamicComponent;
}
```


## API

| Input                                     | Type                       | Default | Required | Description |
| ----------------------------------------- | -------------------------- | ------- | -------- | ----------- |
| ```[ngxComponentOutlet]```                | ```Type<any>```            | n/a     | yes      |             |
| ```[ngxComponentOutletContext]```         | ```any```                  | n/a     | no       |             |
| ```[ngxComponentOutletInjector]```        | ```Injector```             | n/a     | no       |             |
| ```[ngxComponentOutletContent]```         | ```any[][]```              | n/a     | no       |             |
| ```[ngxComponentOutletNgModuleFactory]``` | ```NgModuleFactory<any>``` | n/a     | no       |             |


| Output                                    | Type                       | Description |
| ----------------------------------------- | -------------------------- | ----------- |
| ```(ngxComponentOutletActivate)```        | ```any```                  |             |
| ```(ngxComponentOutletDeactivate)```      | ```any```                  |             |

