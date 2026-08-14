'use client';

import React from 'react';
import { Plus, Download, ShieldAlert, GitCompare, FileText, ChevronDown } from 'lucide-react';

interface ReportsAuditHeaderProps {
  onGenerateReport: () => void;
  onCreateExport: () => void;
  onReviewExceptions: () => void;
  onCompareChanges: () => void;
  onExportAudit: () => void;
}

export function ReportsAuditHeader({
  onGenerateReport,
  onCreateExport,
  onReviewExceptions,
  onCompareChanges,
  onExportAudit,
}: ReportsAuditHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Administration Reports, Audit, Export & Change History
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-4xl leading-normal">
          Review immutable administration audit records, change history, before/after comparison, governance evidence, scheduled reports, exports, high-risk actions and audit-integrity posture across the Administration domain.
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onGenerateReport}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Generate Administration Report</span>
        </button>

        <button
          type="button"
          onClick={onCreateExport}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-gray-500" />
          <span>Create Export</span>
        </button>

        <button
          type="button"
          onClick={onReviewExceptions}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Review Audit Exceptions</span>
        </button>

        <button
          type="button"
          onClick={onCompareChanges}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <GitCompare className="w-3.5 h-3.5 text-gray-500" />
          <span>Compare Changes</span>
        </button>

        <button
          type="button"
          onClick={onExportAudit}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Administration Audit</span>
        </button>

        <button
          type="button"
          className="px-2.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1"
          aria-label="More actions"
        >
          <span>More Actions</span>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </button>
      </div>
    </div>
  );
}

export default ReportsAuditHeader;
