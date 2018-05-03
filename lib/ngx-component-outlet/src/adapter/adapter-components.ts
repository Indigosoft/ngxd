import { Component, DoCheck, OnInit } from '@angular/core';

@Component({ selector: 'ngx-component-outlet-on-init-only', template: '' })
export class OnInitOnlyComponent implements OnInit {
    ngOnInit() {}
}

@Component({ selector: 'ngx-component-outlet-do-check-only', template: '' })
export class DoCheckOnlyComponent implements DoCheck {
    ngDoCheck() {}
}

@Component({ selector: 'ngx-component-outlet-on-init-do-check', template: '' })
export class OnInitAndDoCheckComponent implements OnInit, DoCheck {
    ngOnInit() {}

    ngDoCheck() {}
}
