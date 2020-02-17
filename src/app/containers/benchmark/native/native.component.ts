import { Injectable } from '@angular/core';
import { BenchmarkComponentBase } from '../benchmark.base';
import { ItemsService, MeasureService } from '../benchmark.service';

@Injectable()
export abstract class NativeBenchmarkComponent extends BenchmarkComponentBase {
  constructor(items: ItemsService, measures: MeasureService) {
    super(items, measures, 'native');
  }
}
