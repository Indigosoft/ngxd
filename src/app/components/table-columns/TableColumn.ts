import { TableColumnTypes } from './TableColumnTypes';

export class TableColumn {
    def: string;
    header: string;
    type: TableColumnTypes;

    constructor({ def, header, type }: Partial<TableColumn>) {
        this.def = def;
        this.header = header;
        this.type = type;
    }
}
