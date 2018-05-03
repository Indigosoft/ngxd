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

## Simple Usage Example

We have ```CompAComponent``` and ```CompBComponent``` that we want to use dynamically.

```typescript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-comp-a',
    template: `I'm Dynamic Component A. Hello, {{ name }}!`
})
export class CompAComponent {

    @Input() name: string;

}
```

```typescript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-comp-b',
    template: `I'm Dynamic Component B. Hello, {{ name }}!`
})
export class CompBComponent {

    @Input() name: string;

}
```

To dynamically display the component, we need to create a host component.

```typescript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dynamic-host',
    template: ''
})
export class AppDynamicHost {

    @Input() name: string;

}
```

Also we need to create component that will randomly select a dynamic component and give it to the host of component.

```typescript
import { Component, Input, Type } from '@angular/core';

import { CompAComponent } from './comp-a.component';
import { CompBComponent } from './comp-b.component';

@Component({
    selector: 'app-dynamic',
    template: `<app-dynamic-host [name]="name" [ngxComponentOutlet]="component"></app-dynamic-host>`
})
export class AppDynamicComponent {

    @Input() name: string;

    component: Type<CompAComponent | CompBComponent> = this.getRandomComponent();
    
    getRandomComponent(): Type<CompAComponent | CompBComponent> {
        return Math.random() > 0.5 ? CompAComponent : CompBComponent;
    }

}
```

Add all components to the module, and also imports ```NgxComponentOutletModule```.

You must also specify the components in the ```entryComponents``` To use dynamic components

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxComponentOutletModule } from 'ngx-component-outlet';

import { CompAComponent } from './comp-a.component';
import { CompBComponent } from './comp-b.component';
import { AppDynamicComponent, AppDynamicHost } from './app-dynamic.component';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppDynamicComponent, AppDynamicHost, CompAComponent, CompBComponent ],
    imports: [ BrowserModule, NgxComponentOutletModule.forRoot() ],
    entryComponents: [ CompAComponent, CompBComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
```

Now in AppComponent we will meet Angular.

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-dynamic [name]="'Angular 2'"></app-dynamic>
        <app-dynamic [name]="'Angular 3'"></app-dynamic>
        <app-dynamic [name]="'Angular 4'"></app-dynamic>
        <app-dynamic [name]="'Angular 5'"></app-dynamic>
        <app-dynamic [name]="'Angular 6?'"></app-dynamic>
    `
})
export class AppComponent {}
```

## Advanced Use Cases

Here is a [demo repository showing ngx-component-outlet and Angular](https://github.com/thekiba/ngx-component-outlet) in action.
