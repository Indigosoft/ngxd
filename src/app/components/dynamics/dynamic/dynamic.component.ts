import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, Type } from '@angular/core';

import { EntityComponentResolver, EntityObject } from '@app/components/entities';

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
    templateUrl: 'dynamic.component.html',
    styleUrls: [ 'dynamic.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicComponent implements OnChanges {

    @Input() entity: EntityObject;

    component: Type<any>;

    constructor(private entityComponentResolver: EntityComponentResolver) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.entity) {
            this.component = this.entityComponentResolver.resolve(this.entity);
        }
    }

}
