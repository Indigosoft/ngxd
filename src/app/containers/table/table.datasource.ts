import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { EntityObject } from '../../components/entities';

export class EntitiesDataSource extends DataSource<EntityObject> {
    constructor(private source: Observable<EntityObject[]>) { super(); }

    connect(): Observable<EntityObject[]> {
        return this.source;
    }

    disconnect(): void {}
}

export class TableDataSourceBuilder {
    build(source: Observable<EntityObject[]>): EntitiesDataSource {
        return new EntitiesDataSource(source);
    }
}
