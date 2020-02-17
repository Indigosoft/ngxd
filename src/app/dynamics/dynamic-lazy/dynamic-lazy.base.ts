import { Input, Directive } from '@angular/core';

@Directive()
export class DynamicLazyComponentBase {
    @Input() name: string;
}
