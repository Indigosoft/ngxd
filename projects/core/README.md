# @ngxd/core

> Best way to quickly use Dynamic Components with [Angular](https://angular.io/)

[![npm](https://img.shields.io/npm/v/@ngxd/core.svg?style=flat-square)](https://www.npmjs.com/package/@ngxd/core)
[![npm License](https://img.shields.io/npm/l/@ngxd/core.svg?style=flat-square)](https://github.com/thekiba/@ngxd/core/blob/master/LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![CircleCI](https://img.shields.io/circleci/project/github/IndigoSoft/ngxd/master.svg?label=Circle%20CI&style=flat-square)](https://circleci.com/gh/IndigoSoft/ngxd)
[![Travis](https://img.shields.io/travis/IndigoSoft/ngxd/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/IndigoSoft/ngxd)

[![GitHub contributors](https://img.shields.io/github/contributors/IndigoSoft/ngxd.svg?style=flat-square)](https://github.com/IndigoSoft/ngxd)
[![GitHub PR Stats](http://issuestats.com/github/IndigoSoft/ngxd/badge/pr?style=flat-square)](http://issuestats.com/github/IndigoSoft/ngxd)
[![GitHub Issue Stats](http://issuestats.com/github/IndigoSoft/ngxd/badge/issue?style=flat-square)](http://issuestats.com/github/IndigoSoft/ngxd)

[![GitHub stars](https://img.shields.io/github/stars/IndigoSoft/ngxd.svg?label=GitHub%20Stars&style=flat-square)](https://github.com/IndigoSoft/ngxd)
[![npm Downloads](https://img.shields.io/npm/dw/@ngxd/core.svg?style=flat-square)](https://www.npmjs.com/package/@ngxd/core)

## Example Usage

Use like ```NgComponentOutlet``` but with ```@Input/@Output``` auto bindings:

```angular2html
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

[Github](https://github.com/thekiba/ngx-component-outlet/tree/master/src)

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
  imports: [ NgxdModule ],
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
    @Input() name: string;
}
```

```typescript
@Component({
    selector: 'app-dynamic-comp-b',
    template: `I'm Dynamic Component B. Hello, {{ name }}!`
})
export class CompBComponent {
    @Input() name: string;
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
    selector: 'app-host-for-dynamic',
    template: ''
})
export class HostComponent {
    @Input() name: string;
}
```

### Step 6: Add the component to ```declarations```:

```typescript
@NgModule({
    ...
    declarations: [ ..., HostComponent ],
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
        <app-host-for-dynamic [ngxComponentOutlet]="componentA"
          [name]="'Angular 5!'"></app-host-for-dynamic>
        
        <app-host-for-dynamic [ngxComponentOutlet]="componentB"
          [name]="'Angular 6?'"></app-host-for-dynamic>
    `
})
export class AppComponent {
    componentA = CompAComponent;
    componentB = CompBComponent;
}
```

#### And you will have in AppModule:

```typescript
import { NgxdModule } from '@ngxd/core';

@NgModule({
  imports:      [ NgxdModule ],
  declarations: [ AppComponent, CompAComponent, CompBComponent, HostComponent ],
  entryComponents: [ CompAComponent, CompBComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
```

## API

| Input                                     | Type                       | Default | Required | Description |
| ----------------------------------------- | -------------------------- | ------- | -------- | ----------- |
| ```[ngxComponentOutlet]```                | ```Type<any>```            | n/a     | yes      |             |
| ```[ngxComponentOutletInjector]```        | ```Injector```             | n/a     | no       |             |
| ```[ngxComponentOutletContent]```         | ```any[][]```              | n/a     | no       |             |
| ```[ngxComponentOutletNgModuleFactory]``` | ```NgModuleFactory<any>``` | n/a     | no       |             |


| Output                                    | Type                       | Description |
| ----------------------------------------- | -------------------------- | ----------- |
| ```(ngxComponentOutletActivate)```        | ```any```                  |             |
| ```(ngxComponentOutletDeactivate)```      | ```any```                  |             |

## Advanced Use Cases

Here is a [demo repository showing ngx-component-outlet and Angular](https://github.com/thekiba/ngx-component-outlet/tree/master/src) in action.
