export interface TableColumn<T> {
  id: keyof T | string;
  label: string;
  sortable: boolean;
  minWidth?: number;
  render?: (item: T) => React.ReactNode;
}

export interface TableConfiguration<T> {
  columns: TableColumn<T>[];
  defaultSort: keyof T;
  defaultOrder: "asc" | "desc";
  rowsPerPageOptions: number[];
}
