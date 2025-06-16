import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import type { TableColumn } from "./interface/TableConfiguration";

interface PatientTableHeaderProps<T> {
  columns: TableColumn<T>[];
  orderBy: keyof T;
  orderDir: "asc" | "desc";
  onSort: (column: keyof T) => void;
  selectionState: {
    isAllSelected: boolean;
    isIndeterminate: boolean;
  };
  onSelectAll: (checked: boolean) => void;
}

export const PatientTableHeader = <T,>({
  columns,
  orderBy,
  orderDir,
  onSort,
  selectionState,
  onSelectAll,
}: PatientTableHeaderProps<T>) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox" sx={{ backgroundColor: "grey.50" }}>
        <Checkbox
          indeterminate={selectionState.isIndeterminate}
          checked={selectionState.isAllSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
          size="small"
        />
      </TableCell>
      {columns.map((column) => (
        <TableCell
          key={String(column.id)}
          sx={{
            minWidth: column.minWidth,
            backgroundColor: "grey.50",
            fontWeight: 600,
          }}
        >
          {column.sortable ? (
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderDir}
              onClick={() => onSort(column.id as keyof T)}
            >
              {column.label}
            </TableSortLabel>
          ) : (
            column.label
          )}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
