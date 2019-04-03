import { Pipe, PipeTransform, Type } from '@angular/core';
import { NgxdResolver } from './resolver';

@Pipe({ name: 'resolve', pure: true })
export class NgxComponentOutletResolvePipe implements PipeTransform {
  transform<TEntity, TComponent>(
    resolver: NgxdResolver<TEntity, TComponent>,
    value: TEntity
  ): Type<TComponent> {
    return resolver && resolver.resolve(value);
  }
}
