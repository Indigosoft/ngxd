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

## Usage Example

Let's talk us through a _getting started_ that'll use an Dynamic Component.
– Here we go:

```typescript
import { Component, Input, Module } from '@angular/core';

@Component({
    selector: 'app-my-entity',
    template: `{{ name }}`
})
export class MyEntityComponent {
    @Input() name: string;
}

@Module({
    declarations: [ MyEntityComponent ],
    entryComponents: [ MyEntityComponent ]
})
export class MyEntityModule {}
```

You can easily use _app-my-entity_ through a ngxComponentOutlet directive:

```typescript
import { Component, Input, Type } from '@angular/core';

import { MyEntityModule, MyEntityComponent } from './my-entity';

@Component({
    selector: 'app-dynamic-host',
    template: ''
})
export class AppDynamicHost {
    @Input() name: string;
}

@Component({
    selector: 'app-dynamic',
    template: `<app-dynamic-host [name]="name" [ngxComponentOutlet]="component"></app-dynamic-host>`
})
export class AppDynamicComponent {
    @Input() name: string;
    component: Type<MyEntityComponent> = MyEntityComponent;
}
```

Now, use _app-dynamic_ component and have fun:

```angular2html
<app-dynamic [name]="'Hello, Angular!'"></app-dynamic>
```

## Advanced Use Cases

Here is a [demo repository showing ngx-component-outlet and Angular](https://github.com/thekiba/ngx-component-outlet) in action.
