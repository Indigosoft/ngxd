import { Component, Input } from '@angular/core';
import { TableColumn } from '../TableColumn';
import { TableCellEntityComponentResolver } from './table-cell.resolver';

@Component({
    selector: 'table-cell-host',
    template: ''
})
export class TableCellHostComponent {
    @Input() row: any;
    @Input() column: TableColumn;
}

@Component({
    selector: 'table-cell',
    template: '<table-cell-host [ngxComponentOutlet]="column | resolve: resolver" [column]="column" [row]="row"></table-cell-host>'
})
export class TableCellComponent {
    @Input() row: any;
    @Input() column: TableColumn;

    constructor(public resolver: TableCellEntityComponentResolver) {}
}
