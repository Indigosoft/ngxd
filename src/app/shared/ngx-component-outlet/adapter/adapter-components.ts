import { Component, DoCheck, OnInit } from '@angular/core';

@Component({ selector: 'ngx-component-outlet-on-init-only', template: '' })
export class NgxComponentOutletOnInitOnly implements OnInit {
    ngOnInit() {
    }
}

@Component({ selector: 'ngx-component-outlet-do-check-only', template: '' })
export class NgxComponentOutletDoCheckOnly implements DoCheck {
    ngDoCheck() {
    }
}

@Component({ selector: 'ngx-component-outlet-on-init-do-check', template: '' })
export class NgxComponentOutletOnInitAndDoCheck implements OnInit, DoCheck {
    ngOnInit() {
    }

    ngDoCheck() {
    }
}
