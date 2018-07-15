import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule, Provider, Type } from '@angular/core';

import { NgxdModule } from '@ngxd/core';
import { ENTITY_PROVIDER } from './dynamic-entity.provider';
import { EntityComponentResolver } from './dynamic-entity.resolver';

import { DynamicEntityComponent, DynamicHostComponent } from './dynamic-entity.component';
import { DynamicEntityObject } from './DynamicEntityObject';

@NgModule({
    imports: [ NgxdModule.forChild() ],
    declarations: [ DynamicEntityComponent, DynamicHostComponent ],
    exports: [ DynamicEntityComponent ],
    providers: [ EntityComponentResolver ]
})
export class DynamicEntityModule {
    static provide(type: Type<DynamicEntityObject>, component: Type<any>): Provider[] {
        return [
            { provide: ENTITY_PROVIDER, useValue: { type, component }, multi: true },
            { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true }
        ];
    }
}
