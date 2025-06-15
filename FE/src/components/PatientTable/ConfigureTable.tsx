import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useTableState } from "../../hooks/useTableState";
import { useSelection } from "../../hooks/useSelection";
import { useDataProcessing } from "../../hooks/useDataProcessing";
import { ConfigurableRow } from "./ConfigureRow";
import type { TableConfiguration } from "./interface/TableConfiguration";
import { PatientTableHeader } from "./PatientTableHeader";

interface ConfigureTableProps<T extends { id: number }> {
  data: T[];
  configuration: TableConfiguration<T>;
  searchTerm: string;
  searchFields: (keyof T)[];
  loading?: boolean;
  emptyMessage?: string;
}

export const ConfigureTable = <T extends { id: number }>({
  data,
  configuration,
  searchTerm,
  searchFields,
  loading = false,
  emptyMessage = "No data found",
}: ConfigureTableProps<T>) => {
  const {
    orderBy,
    orderDir,
    page,
    rowsPerPage,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
  } = useTableState({
    data,
    searchTerm,
    defaultSort: configuration.defaultSort,
    defaultOrder: configuration.defaultOrder,
  });

  const { paginatedData, totalCount } = useDataProcessing({
    data,
    searchTerm,
    searchFields,
    orderBy,
    orderDir,
    page,
    rowsPerPage,
  });

  const { selectionState, handleSelectAll, handleSelectOne } =
    useSelection(paginatedData);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
      <TableContainer>
        <Table size="small" stickyHeader>
          <PatientTableHeader
            columns={configuration.columns}
            orderBy={orderBy}
            orderDir={orderDir}
            onSort={handleSort}
            selectionState={selectionState}
            onSelectAll={handleSelectAll}
          />
          <TableBody>
            {paginatedData.map((item) => (
              <ConfigurableRow
                key={item.id}
                item={item}
                columns={configuration.columns}
                isSelected={selectionState.isSelected(item.id)}
                onSelect={handleSelectOne}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={configuration.rowsPerPageOptions}
      />

      {totalCount === 0 && (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">{emptyMessage}</Typography>
        </Box>
      )}
    </Paper>
  );
};
