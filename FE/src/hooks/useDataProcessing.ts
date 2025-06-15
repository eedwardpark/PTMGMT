import { useMemo } from 'react';

interface UseDataProcessingProps<T> {
  data: T[];
  searchTerm: string;
  searchFields: (keyof T)[];
  orderBy: keyof T;
  orderDir: 'asc' | 'desc';
  page: number;
  rowsPerPage: number;
}

export const useDataProcessing = <T>({
  data,
  searchTerm,
  searchFields,
  orderBy,
  orderDir,
  page,
  rowsPerPage,
}: UseDataProcessingProps<T>) => {
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return String(value).toLowerCase().includes(term);
      })
    );
  }, [data, searchTerm, searchFields]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aValue: any = a[orderBy];
      let bValue: any = b[orderBy];

      // Handle nested objects
      if (typeof aValue === 'object' && aValue !== null) {
        aValue = aValue.acronym || aValue.toString();
      }
      if (typeof bValue === 'object' && bValue !== null) {
        bValue = bValue.acronym || bValue.toString();
      }

      // Handle dates
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          aValue = dateA;
          bValue = dateB;
        }
      }

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return orderDir === 'asc' ? 1 : -1;
      if (bValue == null) return orderDir === 'asc' ? -1 : 1;

      if (aValue < bValue) return orderDir === 'asc' ? -1 : 1;
      if (aValue > bValue) return orderDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, orderBy, orderDir]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  return {
    filteredData,
    sortedData,
    paginatedData,
    totalCount: filteredData.length,
  };
};
