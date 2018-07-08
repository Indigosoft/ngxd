import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-lazy-page',
    templateUrl: 'lazy.component.html',
    styleUrls: [ 'lazy.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyPageComponent {}
