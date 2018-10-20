import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DynamicLazyComponentBase, provideLazy } from '@app/dynamics';

@Component({
    selector: 'app-hello-lazy',
    templateUrl: 'hello.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent extends DynamicLazyComponentBase {}

export const COMPONENTS = [ LazyComponent ];
export const PROVIDERS = [ provideLazy('Angular', LazyComponent) ];
