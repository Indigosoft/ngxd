import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';

@Component({ selector: 'ngx-component-outlet-on-init-only', template: '', changeDetection: ChangeDetectionStrategy.OnPush })
export class OnInitOnlyComponent implements OnInit {
    ngOnInit() {}
}

@Component({ selector: 'ngx-component-outlet-do-check-only', template: '', changeDetection: ChangeDetectionStrategy.OnPush })
export class DoCheckOnlyComponent implements DoCheck {
    ngDoCheck() {}
}

@Component({ selector: 'ngx-component-outlet-on-init-do-check', template: '', changeDetection: ChangeDetectionStrategy.OnPush })
export class OnInitAndDoCheckComponent implements OnInit, DoCheck {
    ngOnInit() {}

    ngDoCheck() {}
}
