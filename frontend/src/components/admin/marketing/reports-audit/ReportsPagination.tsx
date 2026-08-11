"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReportsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

export function ReportsPagination({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
}: ReportsPaginationProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-2xs">
      <div className="text-gray-500 font-medium">
        Showing <span className="font-bold text-gray-900">{totalRecords > 0 ? 1 : 0}</span> to{" "}
        <span className="font-bold text-gray-900">{totalRecords}</span> of{" "}
        <span className="font-bold text-gray-900">{totalRecords}</span> reports
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-2 font-semibold text-gray-700 text-xs">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
