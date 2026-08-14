'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from 'lucide-react';

export interface ColumnDef<T> {
  key: string;
  header: string | React.ReactNode;
  accessor?: (row: T) => any;
  cell?: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
  minWidth?: string;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor?: (row: T, index: number) => string | number;
  density?: 'compact' | 'normal' | 'spacious';
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (row: T, query: string) => boolean;
  emptyMessage?: string;
  isLoading?: boolean;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  headerClassName?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data = [],
  keyExtractor,
  density = 'compact',
  sortable = true,
  pagination = false,
  pageSize = 10,
  searchable = false,
  searchPlaceholder = 'Filter records...',
  searchFilter,
  emptyMessage = 'No records found',
  isLoading = false,
  className = '',
  striped = false,
  hoverable = true,
  headerClassName = '',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    if (searchFilter) {
      return data.filter((row) => searchFilter(row, searchQuery.toLowerCase()));
    }
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery, searchFilter]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = col.accessor ? col.accessor(a) : a[sortKey];
      const valB = col.accessor ? col.accessor(b) : b[sortKey];

      if (valA == null && valB == null) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      return sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [filteredData, sortKey, sortDirection, columns]);

  // Paginate
  const totalPages = pagination ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  const handleSort = (key: string, isColSortable?: boolean) => {
    if (!sortable || isColSortable === false) return;
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const padY =
    density === 'compact' ? 'py-1.5 px-2.5' : density === 'normal' ? 'py-2 px-3' : 'py-3 px-4';
  const fontSize = density === 'compact' ? 'text-[10px]' : 'text-xs';

  return (
    <div className={`w-full flex flex-col bg-white border border-gray-200 rounded shadow-xs overflow-hidden ${className}`}>
      {searchable && (
        <div className="p-2 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden focus:ring-1 focus:ring-[#741d35] focus:border-[#741d35]"
            />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">
            {filteredData.length} {filteredData.length === 1 ? 'record' : 'records'}
          </span>
        </div>
      )}

      <div className="w-full overflow-x-auto min-w-0">
        <table className="w-full text-left border-collapse min-w-full">
          <thead>
            <tr className={`bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-bold tracking-wider text-[9px] select-none ${headerClassName}`}>
              {columns.map((col) => {
                const canSort = sortable && col.sortable !== false;
                const isSorted = sortKey === col.key;
                const alignClass =
                  col.align === 'center'
                    ? 'text-center'
                    : col.align === 'right'
                    ? 'text-right'
                    : 'text-left';

                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{ width: col.width, minWidth: col.minWidth }}
                    className={`${padY} ${alignClass} ${canSort ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''} ${col.className || ''}`}
                    onClick={() => canSort && handleSort(col.key, col.sortable)}
                  >
                    <div
                      className={`inline-flex items-center gap-1 ${
                        col.align === 'center'
                          ? 'justify-center'
                          : col.align === 'right'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <span>{col.header}</span>
                      {canSort && (
                        <span className="text-gray-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3 h-3 text-[#741d35]" />
                            ) : (
                              <ChevronDown className="w-3 h-3 text-[#741d35]" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-2.5 h-2.5 opacity-50" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-100 font-medium text-gray-700 ${fontSize}`}>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-gray-400 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#741d35] border-t-transparent rounded-full animate-spin" />
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-xs font-semibold text-gray-600">{emptyMessage}</span>
                    <span className="text-[10px] text-gray-400">No entries match the current filter criteria</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowKey = keyExtractor
                  ? keyExtractor(row, rowIndex)
                  : row.id || row.key || rowIndex;

                return (
                  <tr
                    key={rowKey}
                    className={`transition-colors ${
                      hoverable ? 'hover:bg-gray-50/80' : ''
                    } ${striped && rowIndex % 2 === 1 ? 'bg-gray-50/30' : 'bg-white'}`}
                  >
                    {columns.map((col) => {
                      const alignClass =
                        col.align === 'center'
                          ? 'text-center'
                          : col.align === 'right'
                          ? 'text-right'
                          : 'text-left';

                      const cellContent = col.cell
                        ? col.cell(row, rowIndex)
                        : col.accessor
                        ? col.accessor(row)
                        : row[col.key] ?? '—';

                      return (
                        <td
                          key={`${rowKey}-${col.key}`}
                          style={{ width: col.width, minWidth: col.minWidth }}
                          className={`${padY} ${alignClass} ${col.className || ''}`}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="p-2 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between text-[10px]">
          <span className="text-gray-500 font-medium">
            Page {currentPage} of {totalPages} ({sortedData.length} items)
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
