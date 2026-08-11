"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaidMediaPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function PaidMediaPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaidMediaPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 px-1 py-1">
      {/* Items count summary */}
      <div>
        Showing <span className="font-bold text-gray-900">{startItem}</span> to{" "}
        <span className="font-bold text-gray-900">{endItem}</span> of{" "}
        <span className="font-bold text-gray-900">{totalItems}</span> campaigns
      </div>

      {/* Page Controls & Rows Per Page */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {Array.from({ length: Math.min(totalPages || 1, 5) }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-7 h-7 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  isActive
                    ? "bg-[#800020] text-white border border-[#800020]"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          {totalPages > 5 && (
            <>
              <span className="px-1 text-gray-400">...</span>
              <button
                onClick={() => onPageChange(totalPages)}
                className={`w-7 h-7 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  currentPage === totalPages
                    ? "bg-[#800020] text-white border border-[#800020]"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || totalPages === 0}
            className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rows per page */}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-white border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 font-semibold focus:outline-none cursor-pointer"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>
    </div>
  );
}
