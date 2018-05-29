import { Pipe, PipeTransform, Type } from '@angular/core';
import { NgxdResolver } from '../resolver/resolver';

@Pipe({ name: 'resolve', pure: true })
export class NgxComponentOutletResolvePipe implements PipeTransform {
    transform<TEntity, TComponent>(value: TEntity, resolver: NgxdResolver<TEntity, TComponent>): Type<TComponent> {
        return resolver.resolve(value);
    }
}
