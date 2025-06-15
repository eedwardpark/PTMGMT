import { TableRow as MuiTableRow, TableCell, Checkbox } from "@mui/material";
import type { TableColumn } from "./interface/TableConfiguration";

interface ConfigurableRowProps<T extends { id: number }> {
  item: T;
  columns: TableColumn<T>[];
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const ConfigurableRow = <T extends { id: number }>({
  item,
  columns,
  isSelected,
  onSelect,
}: ConfigurableRowProps<T>) => (
  <MuiTableRow hover selected={isSelected}>
    <TableCell padding="checkbox">
      <Checkbox
        checked={isSelected}
        onChange={() => onSelect(item.id)}
        size="small"
      />
    </TableCell>
    {columns.map((column) => (
      <TableCell key={String(column.id)}>
        {column.render
          ? column.render(item)
          : String(item[column.id as keyof T])}
      </TableCell>
    ))}
  </MuiTableRow>
);
