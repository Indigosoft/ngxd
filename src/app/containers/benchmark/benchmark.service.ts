import { ChangeDetectorRef, Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Item {
    id: number;
    type: number;
}

export type Items = Item[];

export const TOTAL_ITEMS = new InjectionToken('Total Items');

@Injectable()
export class ItemsService {

    items$: BehaviorSubject<Items> = new BehaviorSubject<Items>([]);

    constructor(@Inject(TOTAL_ITEMS) private total: number) {}

    getItems(): Observable<Items> {
        return this.items$.asObservable();
    }

    clearItems() {
        this.items$.next([]);
    }

    createItems(count: number) {
        const items: Items = Array.from(
            { length: count },
            (_, i) => this.items$.value.length + i + 1
        ).map((id) => ({ id, type: id % this.total + 1 }));

        this.items$.next(this.items$.value.concat(items));
    }

}

export type MeasureType = 'native' | 'ng-if' | 'ng-switch' | 'ngxd';

export class Measure {
    type: MeasureType;
    startTime: number = performance.now();
    time: number = 0;
    count: number = 1;
    average: number = 0;

    constructor(type: MeasureType) {
        this.type = type;
    }

    stop() {
        this.time = performance.now() - this.startTime;
        this.average = this.time;
    }

    merge(measure?: Measure): Measure {
        if (!measure) {
            return this;
        }

        const total = measure.count * measure.average + this.count * this.average;
        this.count += measure.count;
        this.average = total / this.count;

        return this;
    }
}

export interface Measures {
    [ type: string ]: Measure;
}

@Injectable()
export class MeasureService {

    measure: Measure = null;
    private measures$: BehaviorSubject<Measures> =
        new BehaviorSubject<Measures>({});

    constructor(private cd: ChangeDetectorRef) {}

    getMeasures(): Observable<Measures> {
        return this.measures$.asObservable();
    }

    start(type: MeasureType) {
        if (this.measure) {
            throw new Error('Measure already started!');
        }

        this.measure = new Measure(type);
    }

    stop() {
        if (this.measure) {
            const measure: Measure = this.measures$.value[this.measure.type];

            this.measure.stop();
            this.measures$.next({
                ...this.measures$.value,
                [ this.measure.type ]: this.measure.merge(measure)
            });
            this.measure = null;
            // this.cd.detectChanges();
        }
    }

    clear() {
        this.measures$.next({});
    }

}
