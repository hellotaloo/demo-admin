'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  sortable?: boolean;
  render?: (item: T, index: number) => React.ReactNode;
  accessor?: (item: T) => any;
}

export type SortDirection = 'asc' | 'desc' | null;

interface DataTableContextValue<T> {
  data: T[];
  columns: Column<T>[];
  sortKey: string | null;
  sortDirection: SortDirection;
  selectedId: string | null;
  onSort: (key: string) => void;
  onRowClick?: (item: T, index: number) => void;
  keyExtractor: (item: T, index: number) => string;
}

const DataTableContext = React.createContext<DataTableContextValue<any> | null>(null);

export function useDataTable<T>() {
  const context = React.useContext(DataTableContext);
  if (!context) {
    throw new Error('useDataTable must be used within a DataTable');
  }
  return context as DataTableContextValue<T>;
}

export interface DataTableProps<T> {
  children: React.ReactNode;
  data: T[];
  columns: Column<T>[];
  selectedId?: string | null;
  onRowClick?: (item: T, index: number) => void;
  keyExtractor?: (item: T, index: number) => string;
  defaultSortKey?: string;
  defaultSortDirection?: 'asc' | 'desc';
  className?: string;
}

export function DataTable<T>({
  children,
  data,
  columns,
  selectedId = null,
  onRowClick,
  keyExtractor = (item: any, index: number) => item.id || String(index),
  defaultSortKey,
  defaultSortDirection = 'asc',
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(defaultSortKey || null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(
    defaultSortKey ? defaultSortDirection : null
  );

  const handleSort = React.useCallback((key: string) => {
    setSortKey((prevKey) => {
      if (prevKey === key) {
        // Toggle direction or clear sort
        setSortDirection((prevDir) => {
          if (prevDir === 'asc') return 'desc';
          if (prevDir === 'desc') {
            setSortKey(null);
            return null;
          }
          return 'asc';
        });
        return key;
      } else {
        // New sort key, default to ascending
        setSortDirection('asc');
        return key;
      }
    });
  }, []);

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDirection) return data;

    const column = columns.find((col) => col.key === sortKey);
    if (!column) return data;

    return [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (column.accessor) {
        aValue = column.accessor(a);
        bValue = column.accessor(b);
      } else {
        aValue = (a as any)[sortKey];
        bValue = (b as any)[sortKey];
      }

      // Handle null/undefined
      if (aValue == null) return sortDirection === 'asc' ? 1 : -1;
      if (bValue == null) return sortDirection === 'asc' ? -1 : 1;

      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Numeric comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Date comparison
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      // Default comparison
      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortKey, sortDirection, columns]);

  const contextValue: DataTableContextValue<T> = {
    data: sortedData,
    columns,
    sortKey,
    sortDirection,
    selectedId: selectedId || null,
    onSort: handleSort,
    onRowClick,
    keyExtractor,
  };

  return (
    <DataTableContext.Provider value={contextValue}>
      <div className={cn('relative w-full overflow-auto', className)}>
        <Table>{children}</Table>
      </div>
    </DataTableContext.Provider>
  );
}
