"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  AlertTriangle,
  ChevronDown,
  Upload,
  Download,
  CalendarPlus,
  ShieldCheck,
} from "lucide-react";

interface ReportsAuditHeaderProps {
  onCreateScheduledReport?: () => void;
}

export function ReportsAuditHeader({ onCreateScheduledReport }: ReportsAuditHeaderProps) {
  const [generateOpen, setGenerateOpen] = useState(false);

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
          <span className="text-gray-900 font-semibold">Reports & Audit</span>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Generate Report */}
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-gray-500" />
            <span>Generate Report</span>
          </button>

          {/* 2. Review Transfer Exceptions */}
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Review Transfer Exceptions</span>
          </button>

          {/* 3. Generate Report Dropdown */}
          <div className="relative">
            <button
              onClick={() => setGenerateOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              <span>Generate Report</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {generateOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 text-xs text-gray-700">
                <button
                  onClick={() => setGenerateOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Executive Marketing Summary
                </button>
                <button
                  onClick={() => setGenerateOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Campaign Performance Detail
                </button>
                <button
                  onClick={() => setGenerateOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Attribution & Contribution
                </button>
              </div>
            )}
          </div>

          {/* 4. Import Marketing Data */}
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Import Marketing Data</span>
          </button>

          {/* 5. Export Marketing Data */}
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Marketing Data</span>
          </button>

          {/* 6. Create Scheduled Report (Primary Crimson) */}
          <button
            onClick={onCreateScheduledReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>+ Create Scheduled Report</span>
          </button>

          {/* 7. Approve / Audit Action */}
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Approve / Audit Action</span>
          </button>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Marketing Reports, Import, Export & Audit
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Generate governed marketing reports, manage data exports and imports, monitor transfer jobs, and review complete compliance audit and evidence history.
        </p>
      </div>
    </div>
  );
}
