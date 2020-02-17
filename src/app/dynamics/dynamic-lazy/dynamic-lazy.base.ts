import { Input, Directive } from '@angular/core';

@Directive() // tslint:disable-next-line:directive-class-suffix
export class DynamicLazyComponentBase {
  @Input() name: string;
}
