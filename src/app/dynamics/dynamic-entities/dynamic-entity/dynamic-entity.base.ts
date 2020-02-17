import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { DynamicEntityObject } from './DynamicEntityObject';

@Directive() // tslint:disable-next-line:directive-class-suffix
export class DynamicEntityComponentBase {
  @Input() entity: DynamicEntityObject;
  @Output() action: EventEmitter<string> = new EventEmitter<string>();
}
