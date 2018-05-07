# ngx-component-outlet

> Best way to quickly use Dynamic Components with [Angular](https://angular.io/)

[![npm](https://img.shields.io/npm/v/ngx-component-outlet.svg?style=flat-square)](https://www.npmjs.com/package/ngx-component-outlet)
[![npm License](https://img.shields.io/npm/l/ngx-component-outlet.svg?style=flat-square)](https://github.com/thekiba/ngx-component-outlet/blob/master/LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![CircleCI](https://img.shields.io/circleci/project/github/thekiba/ngx-component-outlet/master.svg?label=Circle%20CI&style=flat-square)](https://circleci.com/gh/thekiba/ngx-component-outlet)
[![Travis](https://img.shields.io/travis/thekiba/ngx-component-outlet/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/thekiba/ngx-component-outlet)

[![GitHub contributors](https://img.shields.io/github/contributors/thekiba/ngx-component-outlet.svg?style=flat-square)](https://github.com/thekiba/ngx-component-outlet)
[![GitHub PR Stats](http://issuestats.com/github/thekiba/ngx-component-outlet/badge/pr?style=flat-square)](http://issuestats.com/github/thekiba/ngx-component-outlet)
[![GitHub Issue Stats](http://issuestats.com/github/thekiba/ngx-component-outlet/badge/issue?style=flat-square)](http://issuestats.com/github/thekiba/ngx-component-outlet)

[![GitHub stars](https://img.shields.io/github/stars/thekiba/ngx-component-outlet.svg?label=GitHub%20Stars&style=flat-square)](https://github.com/thekiba/ngx-component-outlet)
[![npm Downloads](https://img.shields.io/npm/dw/ngx-component-outlet.svg?style=flat-square)](https://www.npmjs.com/package/ngx-component-outlet)

## Installation

```bash
npm install --save ngx-component-outlet
```

And use like ```NgComponentOutlet``` but with ```@Input/@Output``` auto bindings:

```angular2html
<app-dynamic [ngxComponentOutlet]="component"
    [entity]="entity" (action)="onAction($event)"></app-dynamic>
```

## Demo

#### [Demo Repository](https://github.com/thekiba/ngx-component-outlet/tree/master/src)

#### [Demo Stackblitz](https://stackblitz.com/edit/ngx-component-outlet-demo)

## Simple Usage Example

We have ```CompAComponent``` and ```CompBComponent``` that we want to use dynamically.

```typescript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dynamic-comp-a',
    template: `I'm Dynamic Component A. Hello, {{ name }}!`
})
export class CompAComponent {
    @Input() name: string;
}
```

```typescript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dynamic-comp-b',
    template: `I'm Dynamic Component B. Hello, {{ name }}!`
})
export class CompBComponent {
    @Input() name: string;
}
```

To dynamically display the component, we need to create a host component with the same inputs/outputs.

```typescript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-host-for-dynamic',
    template: ''
})
export class HostComponent {
    @Input() name: string;
}
```

Add all components to the module, and also imports ```NgxComponentOutletModule```.

You must also specify the dynamic components in the ```entryComponents```.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxComponentOutletModule } from 'ngx-component-outlet';

import { AppComponent } from './app.component';
import { CompAComponent, CompBComponent } from './dynamic.component';
import { HostComponent } from './host.component';

@NgModule({
  imports:      [ BrowserModule, NgxComponentOutletModule.forRoot() ],
  declarations: [ AppComponent, CompAComponent, CompBComponent, HostComponent ],
  entryComponents: [ CompAComponent, CompBComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
```

Now in AppComponent we will meet Angular.

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

## Advanced Use Cases

Here is a [demo repository showing ngx-component-outlet and Angular](https://github.com/thekiba/ngx-component-outlet/tree/master/src) in action.
