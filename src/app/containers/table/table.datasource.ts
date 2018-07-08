import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

import { DynamicEntityObject } from '../../components/dynamic-entities';

export class EntitiesDataSource extends DataSource<DynamicEntityObject> {
    constructor(private source: Observable<DynamicEntityObject[]>) { super(); }

    connect(): Observable<DynamicEntityObject[]> {
        return this.source;
    }

    disconnect(): void {}
}

export class TableDataSourceBuilder {
    build(source: Observable<DynamicEntityObject[]>): EntitiesDataSource {
        return new EntitiesDataSource(source);
    }
}
