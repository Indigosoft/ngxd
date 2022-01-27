# ✨🦊 NGX Dynamic for Angular Ivy and Angular 7, 8, 9, 10, 11, 12, 13+

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

Use like ```NgComponentOutlet``` but with ```@Input``` and ```@Output``` auto bindings:

```html
<ng-container *ngxComponentOutlet="component"></ng-container>
```

Here is a [demo example](https://stackblitz.com/edit/angular-simple-dynamic) showing NGX Dynamic and Angular in action.

* [Getting started](#getting-started)
* [Use cases](#use-cases)
    * [1. Binding inputs and outputs](#1-binding-inputs-and-outputs)
    * [2. Switching the component](#2-switching-the-component)
    * [3. Lazy loading the dynamic component](#3-lazy-loading-the-dynamic-component)
    * [4. Content projection](#4-content-projection)


# Getting started

## Step 1: Install ```@ngxd/core```:

```bash
npm install --save @ngxd/core
# or
yarn add @ngxd/core
```

> Note: @ngxd/core@12 only supports angular with Ivy is enabled

> Note: If you want to use @ngxd/core with a specific angular version, you have to install @ngxd/core which version you need:
> *  @angular/core@7  => npm install @ngxd/core@7
> *  @angular/core@8  => npm install @ngxd/core@8
> *  @angular/core@9  => npm install @ngxd/core@9
> *  @angular/core@10 => npm install @ngxd/core@10
> *  @angular/core@11 => npm install @ngxd/core@11
> *  @angular/core@12 => npm install @ngxd/core@12
> *  @angular/core@13 => npm install @ngxd/core@13

## Step 2: Import the NgxdModule:

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

## Step 3: Use NgxComponentOutlet directly:

```typescript
@Component({
  template: `
    <ng-container *ngxComponentOutlet="component"></ng-container>`
    // using @ngxd/core 👆
})
class MyComponent {  
  // your dynamic component 👇
  component = DynamicComponent;

  // 🥳 inputs and outputs will binding automatically
  @Input() entity;
  @Output() action;
}
```


# Use cases

There are several modes of operation of the directive.

## 1. Binding inputs and outputs
A simple variant of binding through the parent component.
```typescript
@Component({
  template: `
    <ng-container *ngxComponentOutlet="component"></ng-container>`
    // using @ngxd/core 👆
})
class MyComponent {  
  // your dynamic component 👇
  component = DynamicComponent;

  // 🥳 inputs and outputs will binding automatically
  @Input() entity;
  @Output() action;
}
```

### Binding inputs through the context
> Note: You not permitted to passing the outputs using the context.
> The context will be passing inputs only.

In the example below, you can see the binding through the context. This is useful when you need to display something through *ngFor. Note that the context has a higher priority than the inputs in the component.
```html
<ng-container *ngFor="let color of colors"
  <ng-container *ngxComponentOutlet="
      component; context: { color: color }
  "></ng-container>
</ng-container>
```

## 2. Switching the component
To switch a component, you just need to overwrite it with another one.
```typescript
class AppComponent {
  ngOnChanges(changes: SimpleChanges): void {
    if ('type' in changes) {
      switch (this.type) {
        case 'number':
          this.component = NumberComponent;
          break;
        case 'text':
          this.component = TextComponent;
          break;
        default:
          this.component = DefaultComponent;
      }
    }
  }
}
```

### Switching the component using pipe and resolver
If you have a bunch of components, then you go to switch between them. To do this, you can use NgxdResolvePipe and NgxdResolver to help you isolate dynamic component selection.
```html
<ng-container *ngxComponentOutlet="
    resolver | resolve : type
"></ng-container>
```

## 3. Lazy loading the dynamic component
If you need to load and display a dynamic component lazily, then you can use lazy import and pass it to the async pipe.

```typescript
component = import('./my-lazy-component')
  .then(m => m.MyLazyComponent);
```

```html
<ng-container *ngxComponentOutlet="
    component | async
"></ng-container>
```

### Lazy loading bunch of dynamic components
You can also load a bunch of components lazily and render them.

```typescript
resolver = import('./my-lazy-resolver')
  .then(m => m.myLazyResolver);
```

```html
<ng-container *ngxComponentOutlet="
    resolver | async | resolve : type
"></ng-container>
```

## 4. Content projection
If you want to use the ```<ng-content>``` and pass the content to your dynamic component, you have to check the example below.

[Click to here](https://github.com/IndigoSoft/ngxd/issues/30#issuecomment-627472367)


# Comparison

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


# API

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

