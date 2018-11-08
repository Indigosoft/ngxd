# NGX Dynamic

> Best way to quickly use Dynamic Components with [Angular](https://angular.io/)

[![npm](https://img.shields.io/npm/v/@ngxd/core.svg?style=flat-square)](https://www.npmjs.com/package/@ngxd/core)
[![npm License](https://img.shields.io/npm/l/@ngxd/core.svg?style=flat-square)](https://github.com/IndigoSoft/@ngxd/core/blob/master/LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![CircleCI](https://img.shields.io/circleci/project/github/IndigoSoft/ngxd/master.svg?label=Circle%20CI&style=flat-square)](https://circleci.com/gh/IndigoSoft/ngxd)
[![Travis](https://img.shields.io/travis/IndigoSoft/ngxd/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/IndigoSoft/ngxd)

[![GitHub contributors](https://img.shields.io/github/contributors/IndigoSoft/ngxd.svg?style=flat-square)](https://github.com/IndigoSoft/ngxd)
[![GitHub PR Stats](http://issuestats.com/github/IndigoSoft/ngxd/badge/pr?style=flat-square)](http://issuestats.com/github/IndigoSoft/ngxd)
[![GitHub Issue Stats](http://issuestats.com/github/IndigoSoft/ngxd/badge/issue?style=flat-square)](http://issuestats.com/github/IndigoSoft/ngxd)

[![GitHub stars](https://img.shields.io/github/stars/IndigoSoft/ngxd.svg?label=GitHub%20Stars&style=flat-square)](https://github.com/IndigoSoft/ngxd)
[![npm Downloads](https://img.shields.io/npm/dw/@ngxd/core.svg?style=flat-square)](https://www.npmjs.com/package/@ngxd/core)

# NGX Dynamic v0.x to v7 Update Guide
 
NGX Dynamic v7 will arriving soon! While this is a major version change (from 0.x to 7.x).

- [MIGRATION.md](./MIGRATION.md)

## Example Usage

Use like ```NgComponentOutlet``` but with ```@Input/@Output``` auto bindings:

```html
<ng-container *ngxComponentOutlet="component"></ng-container>
```

## Dynamic Components In 5 minutes

There are several modes of operation of the directive.

### Through The Parent Component
A simple variant of binding through the parent component.
```typescript
@Component({
  template: `
  <ng-container
    *ngxComponentOutlet="component”
  ></ng-container>`
})
class DynamicComponent {
  @Input() entity;
  @Output() action;
}
```

### Through The Context
Additionally there is autobinding through the context. This is useful when you need to display something through *ngFor. Context has a higher priority than the inputs in the component.
```html
<ng-container *ngFor=“let color of colors”
  <ng-container
    *ngxComponentOutlet="
      component;
      context: { color: color }
  ”></ng-container>
</ng-container>
```

### Pipe For Selecting The Component
For ease of selecting the required component, there is ResolvePipe, which expects NgxdResolver to enter, and returns the required component.
```html
<ng-container *ngxComponentOutlet="
    resolver | resolve: entity
”></ng-container>
```

### Through The Host Component (deprecated)
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

## Demo

#### [Heroes](https://ngx-component-outlet-demo.stackblitz.io/)

List of heroes

#### [Table And Form](https://ngx-component-outlet-demo.stackblitz.io/table)

Table of heroes with table schema form

#### Editable Demo

[Stackblitz](https://stackblitz.com/edit/ngx-component-outlet-demo)

[Github](https://github.com/IndigoSoft/ngxd/tree/master/src)

## Getting started

### Step 1: Install ```@ngxd/core```:

#### NPM

```bash
npm install --save @ngxd/core
```

#### Yarn

```bash
yarn add @ngxd/core
```

### Step 2: Import the NgxdModule:

```typescript
import { NgxdModule } from '@ngxd/core';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, NgxdModule ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

### Step 3: Create components that your want to use dynamically:

```typescript
@Component({
    selector: 'app-dynamic-comp-a',
    template: `I'm Dynamic Component A. Hello, {{ name }}!`
})
export class CompAComponent {
    @HostBinding('style.color') @Input() color: string;
    @Input() name: string;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
    
    @HostListener('click', ['$event.target'])
    onClick($event) {
        this.action.emit($event);
    }
}
```

```typescript
@Component({
    selector: 'app-dynamic-comp-b',
    template: `I'm Dynamic Component B. Hello, {{ name }}!`
})
export class CompBComponent {
    @HostBinding('style.color') @Input() color: string;
    @Input() name: string;
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
    
    @HostListener('click', ['$event.target'])
    onClick($event) {
        this.action.emit($event);
    }
}
```

### Step 4: Add components to ```declarations``` and ```entryComponents```:

```typescript
@NgModule({
    ...
    declarations: [ ..., CompAComponent, CompBComponent ],
    entryComponents: [ CompAComponent, CompBComponent ]
})
export class AppModule {}
```

### Step 5: Create a host component with the same inputs/outputs:

```typescript
@Component({
    selector: 'app-items',
    template: `
    <ng-container *ngFor="let item of items">
        <ng-container *ngxComponentOutlet="
            item.component;
            context: { name: item.name }
        "></ng-container>
    </ng-container>
    `
})
export class ItemsComponent {
    @Input() color: string;
    @Input() items: { name: string; component: Type<any> }[];
    @Output() action: EventEmitter<any> = new EventEmitter<any>();
}
```

### Step 6: Add the component to ```declarations```:

```typescript
@NgModule({
    ...
    declarations: [ ..., ItemsComponent ],
    ...
})
export class AppModule {}
```

### Step 7: Now show dynamic component in AppComponent:

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-items [items]="items" (action)="onAction($event)" color="red"></app-items>
    `
})
export class AppComponent {
    items = [
        {
            name: 'Angular 5!',
            component: CompAComponent
        },
        {
            name: 'Angular 6!',
            component: CompBComponent
        }
    ];
    
    onAction($event) {
        console.log($event);
    }
}
```

#### And you will have in AppModule:

```typescript
import { NgxdModule } from '@ngxd/core';

@NgModule({
  imports:      [ BrowserModule, NgxdModule ],
  declarations: [ AppComponent, CompAComponent, CompBComponent, ItemsComponent ],
  entryComponents: [ CompAComponent, CompBComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
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

## Advanced Use Cases

Here is a [demo repository](./src) showing NGX Dynamic and Angular in action.
