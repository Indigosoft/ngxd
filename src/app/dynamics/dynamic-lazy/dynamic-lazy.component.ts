import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Injector, Input, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LazyComponentResolver } from './dynamic-lazy.resolver';

export const LAZY_MODULE_PATH = new InjectionToken<string>('LAZY_MODULE_PATH');

@Component({
    selector: 'app-dynamic-lazy-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicLazyHostComponent {
    @Input() name: string;
}

@Component({
    selector: 'app-dynamic-lazy',
    templateUrl: 'dynamic-lazy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicLazyComponent {

    @Input() name: string;

    ngModuleFactory$: Observable<NgModuleFactory<any>> =
        from(this.ngModuleFactoryLoader.load(this.lazyModulePath));

    resolver$: Observable<LazyComponentResolver> = this.ngModuleFactory$.pipe(
        map(ngModuleFactory =>
            ngModuleFactory.create(this.injector).injector.get(LazyComponentResolver)
        )
    );

    constructor(
        @Inject(LAZY_MODULE_PATH) private lazyModulePath: string,
        private ngModuleFactoryLoader: NgModuleFactoryLoader,
        private injector: Injector
    ) {}

}
