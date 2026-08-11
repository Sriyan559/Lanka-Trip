import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, PackageX } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  emptyMessage = "No records found.",
  loading = false,
  className = "",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key?: keyof T) => {
    if (!key) return;
    if (sortColumn === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  if (loading) {
    return (
      <div className="w-full border rounded-lg p-6 bg-white space-y-3 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-10 bg-gray-100 rounded w-full" />
        <div className="h-10 bg-gray-100 rounded w-full" />
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden border border-gray-200 rounded-lg bg-white shadow-2xs ${className}`}
    >
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable && handleSort(col.accessorKey)}
                  className={`p-2.5 whitespace-nowrap ${
                    col.sortable ? "cursor-pointer select-none hover:bg-gray-100/60" : ""
                  } ${
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left"
                  } ${col.className || ""}`}
                >
                  <div
                    className={`inline-flex items-center gap-1 ${
                      col.align === "center"
                        ? "justify-center"
                        : col.align === "right"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-gray-400">
                        {sortColumn === col.accessorKey ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="w-3 h-3 text-rose-700" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-rose-700" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3 h-3 opacity-40" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-rose-50/20 transition-colors text-gray-800"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`p-2.5 whitespace-nowrap ${
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                          ? "text-right"
                          : "text-left"
                      } ${col.className || ""}`}
                    >
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                        ? String(row[col.accessorKey] ?? "--")
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-8 text-center text-gray-500 bg-gray-50/40"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <PackageX className="w-6 h-6 text-gray-400" />
                    <span className="text-xs font-medium">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
