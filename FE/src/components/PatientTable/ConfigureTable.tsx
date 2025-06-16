import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import { useSelection } from "../../hooks/useSelection";
import { ConfigurableRow } from "./ConfigureRow";
import type { TableConfiguration } from "./interface/TableConfiguration";
import { PatientTableHeader } from "./PatientTableHeader";
import { sortData } from "../../utils/sortingUtils";

interface ConfigureTableProps<T extends { id: number }> {
  data: T[]; // Already filtered data from store
  configuration: TableConfiguration<T>;
  loading?: boolean;
  emptyMessage?: string;
}

export const ConfigureTable = <T extends { id: number }>({
  data,
  configuration,
  loading = false,
  emptyMessage = "No data found",
}: ConfigureTableProps<T>) => {
  const [orderBy, setOrderBy] = useState<keyof T>(configuration.defaultSort);
  const [orderDir, setOrderDir] = useState<"asc" | "desc">(
    configuration.defaultOrder,
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const sortedData = useMemo(() => {
    return sortData(data, orderBy, orderDir);
  }, [data, orderBy, orderDir]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  const { selectionState, handleSelectAll, handleSelectOne } =
    useSelection(paginatedData);

  const handleSort = useCallback(
    (column: keyof T) => {
      const isAsc = orderBy === column && orderDir === "asc";
      setOrderBy(column);
      setOrderDir(isAsc ? "desc" : "asc");
    },
    [orderBy, orderDir],
  );

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [],
  );

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
        <Table stickyHeader size="small">
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
        count={data.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={configuration.rowsPerPageOptions}
      />

      {data.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">{emptyMessage}</Typography>
        </Box>
      )}
    </Paper>
  );
};
