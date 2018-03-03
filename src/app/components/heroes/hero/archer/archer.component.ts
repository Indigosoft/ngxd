import { Component, Input } from '@angular/core';
import { Archer } from '@app/domain/heroes';

import { HeroComponentBase } from '../hero.component.interface';

@Component({
    selector: 'app-archer-hero',
    templateUrl: 'archer.component.html'
})
export class ArcherHeroComponent implements HeroComponentBase {

    @Input() hero: Archer;

    ngOnChanges() {
        console.log('ngOnChanges');
    }

    ngOnInit() {
        console.log('ngOnInit');
    }

    ngAfterContentInit() {
        console.log('ngAfterContentInit');
    }

    ngAfterContentChecked() {
        console.log('ngAfterContentChecked');
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit');
    }

    ngAfterViewChecked() {
        console.log('ngAfterViewChecked');
    }

    ngOnCheck() {
        console.log('ngOnCheck');
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
    }

}
