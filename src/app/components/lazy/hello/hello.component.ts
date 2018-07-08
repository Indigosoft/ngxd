import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { provideLazy } from '../../dynamic-lazy';

@Component({
    selector: 'app-hello-lazy',
    templateUrl: 'hello.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent {

    @Input() name: string;

}

export const COMPONENTS = [ LazyComponent ];
export const PROVIDERS = [ provideLazy('Angular', LazyComponent) ];
