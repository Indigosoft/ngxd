import { AfterViewChecked, EventEmitter, Input, Output, Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, Items, ItemsService, MeasureService, MeasureType } from './benchmark.service';

@Directive()
export abstract class BenchmarkComponentBase implements AfterViewChecked {
    @Input() count: number;
    @Input() repeat: number;
    @Output() event: EventEmitter<number> = new EventEmitter<number>();

    items$: Observable<Items> = this.items.getItems();

    left: number = 0;

    protected constructor(
        private items: ItemsService,
        private measures: MeasureService,
        private type: MeasureType
    ) {}

    auto() {
        this.left = this.repeat;
        this.clear();
        this.create();
    }

    create() {
        this.items.createItems(this.count);
        this.measures.start(this.type);
    }

    clear() {
        this.items.clearItems();
    }

    trackById(index: number, item: Item): number {
        return item.id;
    }

    onEvent($event) {
        this.event.emit($event);
    }

    ngAfterViewChecked() {
        this.measures.stop();

        setTimeout(() => {
            if (this.left > 0 && !this.measures.measure) {
                this.left--;
                this.create();
            }
        }, 1);
    }
}
