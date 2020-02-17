import { Injectable, Type } from '@angular/core';
import { BenchmarkComponentBase } from '../benchmark.base';
import { ItemsService, MeasureService } from '../benchmark.service';

export abstract class ComponentResolver {
  count: number;

  protected constructor(private components: Type<any>[] = []) {
    this.count = components.length;
  }

  resolve(id: number): Type<any> {
    return this.components[id];
  }
}

@Injectable()
export abstract class NgxdBenchmarkComponent extends BenchmarkComponentBase {
  constructor(public resolver: ComponentResolver, items: ItemsService, measures: MeasureService) {
    super(items, measures, 'ngxd');
  }
}
