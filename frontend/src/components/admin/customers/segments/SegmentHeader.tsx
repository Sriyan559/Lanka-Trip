"use client";

import React, { useState } from "react";
import { Download, AlertTriangle, Plus, ChevronDown, RefreshCw } from "lucide-react";

interface SegmentHeaderProps {
  onExportReport: () => void;
  onReviewConflicts: () => void;
  onOpenCreateSegment: () => void;
  onBulkAction: (action: string) => void;
  showToast: (msg: string) => void;
}

export function SegmentHeader({
  onExportReport,
  onReviewConflicts,
  onOpenCreateSegment,
  onBulkAction,
  showToast,
}: SegmentHeaderProps) {
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const bulkOptions = [
    "Recalculate Selected",
    "Revalidate Selected",
    "Export Selected",
    "Archive Selected",
    "Assign Owner",
    "Change Schedule",
  ];

  return (
    <div className="flex flex-col gap-3 pb-3 border-b border-line mb-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
        <span>Customers</span>
        <span>/</span>
        <span className="text-slate-800 font-bold uppercase">Customer Segments</span>
      </div>

      {/* Main Header & Actions Row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
            Customer Segments & Groups
          </h1>
          <p className="text-[11.5px] text-slate-600 font-normal max-w-4xl mt-0.5 leading-relaxed">
            Manage dynamic customer segments, static groups, lifecycle audiences, value cohorts, loyalty groups, consent-ready audiences, risk pools, and governed membership operations across the beauty marketplace.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onExportReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-line rounded-md text-[11.5px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Segment Report</span>
          </button>

          <button
            type="button"
            onClick={onReviewConflicts}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-line rounded-md text-[11.5px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Review Segment Conflicts</span>
          </button>

          {/* Bulk Actions Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsBulkOpen(!isBulkOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-line rounded-md text-[11.5px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Bulk Actions</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isBulkOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-line rounded-md shadow-lg py-1 z-30 text-[11px]">
                {bulkOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onBulkAction(opt);
                      setIsBulkOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium text-slate-700 cursor-pointer block"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Create Button */}
          <button
            type="button"
            onClick={onOpenCreateSegment}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#671021] text-white rounded-md text-[11.5px] font-bold hover:bg-[#520d1a] transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Segment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
