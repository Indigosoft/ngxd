import { TableColumnTypes } from './TableColumnTypes';

export class TableColumn {
  def: string;
  header: string;
  type: TableColumnTypes;
  visible: boolean;
  editable: boolean;

  constructor({ def, header, type, visible, editable }: Partial<TableColumn>) {
    this.def = def;
    this.header = header;
    this.type = type;
    this.visible = visible;
    this.editable = editable;
  }
}
