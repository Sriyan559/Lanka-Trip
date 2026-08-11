"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  AlertTriangle,
  ChevronDown,
  Layers,
  FileText,
} from "lucide-react";

interface AttributionHeaderProps {
  onGenerateReport?: () => void;
}

export function AttributionHeader({ onGenerateReport }: AttributionHeaderProps) {
  const [bulkOpen, setBulkOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 bg-white p-3 sm:p-4 rounded-xl border border-gray-200/80 shadow-2xs">
      {/* Top Breadcrumb & Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link
            href="/admin/marketing"
            className="hover:text-[#800020] transition-colors"
          >
            Marketing
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Attribution & Analytics</span>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Export Attribution Report */}
          <Link
            href="/admin/marketing/reports-audit"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Attribution Report</span>
          </Link>

          {/* 2. Review Analytics Exceptions */}
          <Link
            href="/admin/marketing/governance"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Review Analytics Exceptions</span>
          </Link>

          {/* 3. Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBulkOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <span>Bulk Actions</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {bulkOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 text-xs text-gray-700">
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Recalculate Attribution
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Export Attribution Matrix
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Sync Finance Revenue Reference
                </button>
              </div>
            )}
          </div>

          {/* 4. Compare Models */}
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Compare Models</span>
          </button>

          {/* 5. Generate Executive Report (Crimson Primary Button) */}
          <button
            onClick={onGenerateReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>+ Generate Executive Report</span>
          </button>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Marketing Attribution, Analytics & Performance Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Measure authoritative marketing contribution, cross-channel performance, customer acquisition, lifecycle impact and attributed revenue across the ecosystem.
        </p>
      </div>
    </div>
  );
}
