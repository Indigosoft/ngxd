import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { DynamicEntityObject } from './DynamicEntityObject';

@Directive()
export class DynamicEntityComponentBase {
    @Input() entity: DynamicEntityObject;
    @Output() action: EventEmitter<string> = new EventEmitter<string>();
}
