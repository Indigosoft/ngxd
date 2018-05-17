import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { EntityComponentResolver, EntityObject } from '../../entities';

@Component({
    selector: 'app-dynamic-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicHostComponent {

    @Input() entity: EntityObject;

}

@Component({
    selector: 'app-dynamic',
    template: '<app-dynamic-host [ngxComponentOutlet]="entity | resolve: resolver" [entity]="entity"></app-dynamic-host>',
    styleUrls: [ 'dynamic.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicComponent {

    @Input() entity: EntityObject;

    constructor(public resolver: EntityComponentResolver) {}

}
