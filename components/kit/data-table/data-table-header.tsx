'use client';

import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { useDataTable } from './data-table';

export interface DataTableHeaderProps {
  className?: string;
}

export function DataTableHeader({ className }: DataTableHeaderProps = {}) {
  const { columns, sortKey, sortDirection, onSort } = useDataTable();

  return (
    <TableHeader className={className}>
      <TableRow>
        {columns.map((column) => {
          const isSorted = sortKey === column.key;
          const isSortable = column.sortable !== false;

          return (
            <TableHead
              key={column.key}
              className={cn(
                column.className,
                isSortable && 'cursor-pointer select-none hover:bg-gray-50 transition-colors',
                isSorted && 'bg-gray-50'
              )}
              onClick={() => isSortable && onSort(column.key)}
            >
              <div className="flex items-center gap-2">
                <span>{column.header}</span>
                {isSortable && (
                  <span className="inline-flex items-center">
                    {isSorted ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="w-4 h-4 text-gray-700" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-gray-700" />
                      )
                    ) : (
                      <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                    )}
                  </span>
                )}
              </div>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
