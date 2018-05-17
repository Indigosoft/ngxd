import { Pipe, PipeTransform, Type } from '@angular/core';

export abstract class NgxComponentOutletResolver<TEntity, TComponent> {
    abstract resolve(entity: TEntity): Type<TComponent>;
}

@Pipe({ name: 'resolve', pure: true })
export class NgxComponentOutletResolvePipe implements PipeTransform {
    transform<TEntity, TComponent>(value: TEntity, resolver: NgxComponentOutletResolver<TEntity, TComponent>): Type<TComponent> {
        return resolver.resolve(value);
    }
}
