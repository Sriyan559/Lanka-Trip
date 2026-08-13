'use client';

import React from 'react';
import { Plus, Download, Upload, AlertTriangle, Shield, ChevronDown } from 'lucide-react';

interface ReportsAuditHeaderProps {
  onGenerateReport?: () => void;
  onCreateScheduled?: () => void;
  onExportData?: () => void;
  onImportData?: () => void;
  onReviewExceptions?: () => void;
  onReviewAuditTrail?: () => void;
  onMoreActions?: () => void;
}

export function ReportsAuditHeader({
  onGenerateReport,
  onCreateScheduled,
  onExportData,
  onImportData,
  onReviewExceptions,
  onReviewAuditTrail,
  onMoreActions,
}: ReportsAuditHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <span>Customer Support</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Reports / Audit</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          CS14 — Customer Support Reports, Import, Export &amp; Audit
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
          Generate operational and compliance reports • Import and export support data • Monitor transfers and exceptions • Capture audit trail • Support audit history.
        </p>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        {/* Row 1 Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onGenerateReport}
            className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Plus size={14} />
            Generate Report
          </button>

          <button
            type="button"
            onClick={onCreateScheduled}
            className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Plus size={14} />
            Create Scheduled Report
          </button>

          <button
            type="button"
            onClick={onExportData}
            className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Download size={14} className="text-slate-500" />
            Export Support Data
          </button>

          <button
            type="button"
            onClick={onImportData}
            className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Upload size={14} className="text-slate-500" />
            Import Support Data
          </button>
        </div>

        {/* Row 2 Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onReviewExceptions}
            className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <AlertTriangle size={13} className="text-amber-500" />
            Review Transfer Exceptions
          </button>

          <button
            type="button"
            onClick={onReviewAuditTrail}
            className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Shield size={13} className="text-slate-500" />
            Review Audit Trail
          </button>

          <button
            type="button"
            onClick={onMoreActions}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1"
          >
            More Actions
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
