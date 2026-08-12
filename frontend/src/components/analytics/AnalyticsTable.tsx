"use client";

import React from "react";
import { TrendIndicator } from "./TrendIndicator";
import { SparklineChart } from "./charts/SparklineChart";
import { formatNumber, formatCurrency, formatPercentage } from "@/utils/formatters";

export interface ColumnDef<T = any> {
  header: string;
  accessorKey: keyof T | string;
  align?: "left" | "center" | "right";
  cellType?: "text" | "number" | "currency" | "percentage" | "delta" | "trend" | "sparkline" | "badge" | "custom";
  currencyCode?: string;
  renderCell?: (row: T, index: number) => React.ReactNode;
  width?: string;
}

interface AnalyticsTableProps<T = any> {
  columns: ColumnDef<T>[];
  data: T[];
  currencyCode?: string;
  highlightTotalRow?: boolean;
  compact?: boolean;
  isLoading?: boolean;
  emptyText?: string;
  className?: string;
}

export function AnalyticsTable<T extends Record<string, any>>({
  columns,
  data = [],
  currencyCode = "LKR",
  highlightTotalRow = false,
  compact = true,
  isLoading = false,
  emptyText = "No data available",
  className = "",
}: AnalyticsTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full animate-pulse py-4 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-full" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full text-center py-6 text-xs text-slate-400 font-medium">
        {emptyText}
      </div>
    );
  }

  const pyClass = compact ? "py-1.5 px-2" : "py-2.5 px-3";

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-[11px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{ width: col.width }}
                className={`${pyClass} ${
                  col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-800">
          {data.map((row, rowIdx) => {
            const isLast = rowIdx === data.length - 1;
            const isTotalRow = highlightTotalRow && isLast;

            return (
              <tr
                key={rowIdx}
                className={`transition-colors hover:bg-slate-50/80 ${
                  isTotalRow ? "bg-slate-100/80 font-bold border-t-2 border-slate-300" : ""
                }`}
              >
                {columns.map((col, colIdx) => {
                  const rawVal = row[col.accessorKey as string];

                  let cellContent: React.ReactNode = rawVal;

                  if (col.renderCell) {
                    cellContent = col.renderCell(row, rowIdx);
                  } else if (col.cellType === "currency") {
                    cellContent = formatCurrency(rawVal as any, col.currencyCode || currencyCode);
                  } else if (col.cellType === "percentage") {
                    cellContent = formatPercentage(rawVal as any);
                  } else if (col.cellType === "number") {
                    cellContent = formatNumber(rawVal as any);
                  } else if (col.cellType === "delta") {
                    const isPos = row.isPositive !== false;
                    cellContent = (
                      <TrendIndicator
                        value={rawVal}
                        isPositive={isPos}
                        direction={rawVal?.toString().startsWith("-") ? "down" : "up"}
                      />
                    );
                  } else if (col.cellType === "sparkline" && Array.isArray(rawVal)) {
                    cellContent = <SparklineChart data={rawVal} width={50} height={18} />;
                  }

                  return (
                    <td
                      key={colIdx}
                      className={`${pyClass} ${
                        col.align === "right"
                          ? "text-right font-medium tabular-nums whitespace-nowrap"
                          : col.align === "center"
                          ? "text-center font-medium whitespace-nowrap"
                          : "text-left font-normal min-w-0 max-w-0 truncate"
                      }`}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
