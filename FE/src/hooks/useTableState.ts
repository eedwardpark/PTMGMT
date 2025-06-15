import { useState, useMemo, useCallback } from 'react';

interface UseTableStateProps<T> {
  data: T[];
  searchTerm: string;
  defaultSort: keyof T;
  defaultOrder: 'asc' | 'desc';
}

export const useTableState = <T>({ 
  data, 
  defaultSort, 
  defaultOrder 
}: UseTableStateProps<T>) => {
  const [orderBy, setOrderBy] = useState<keyof T>(defaultSort);
  const [orderDir, setOrderDir] = useState<'asc' | 'desc'>(defaultOrder);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = useCallback((column: keyof T) => {
    const isAsc = orderBy === column && orderDir === 'asc';
    setOrderBy(column);
    setOrderDir(isAsc ? 'desc' : 'asc');
  }, [orderBy, orderDir]);

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const adjustedPage = useMemo(() => {
    const maxPage = Math.max(0, Math.ceil(data.length / rowsPerPage) - 1);
    return Math.min(page, maxPage);
  }, [data.length, page, rowsPerPage]);

  return {
    orderBy,
    orderDir,
    page: adjustedPage,
    rowsPerPage,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
  };
};