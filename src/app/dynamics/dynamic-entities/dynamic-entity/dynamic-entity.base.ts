import { EventEmitter, Input, Output } from '@angular/core';
import { DynamicEntityObject } from './DynamicEntityObject';

export class DynamicEntityComponentBase {
    @Input() entity: DynamicEntityObject;
    @Output() action: EventEmitter<string> = new EventEmitter<string>();
}
