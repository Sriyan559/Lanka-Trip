import React from 'react';
import {
  Download, Eye, ClipboardCheck, Plus, MoreHorizontal,
  ShieldAlert,
} from 'lucide-react';

interface RecallSafetyHeaderProps {
  onExportReport?: () => void;
  onReviewCritical?: () => void;
  onStartAssessment?: () => void;
  onCreateIncident?: () => void;
}

export function RecallSafetyHeader({
  onExportReport,
  onReviewCritical,
  onStartAssessment,
  onCreateIncident,
}: RecallSafetyHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
      {/* Breadcrumb + title */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium mb-1">
          <ShieldAlert size={11} className="text-[#7a0023]" />
          <span>Verification &amp; Compliance</span>
          <span className="text-gray-300">/</span>
          <span>Recall &amp; Safety Incidents</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-semibold">Command Center</span>
        </div>
        <h1 className="text-[22px] font-bold text-gray-900 leading-tight mb-1">
          Recall &amp; Safety Incident Command Center
        </h1>
        <p className="text-[12px] text-gray-500 leading-relaxed max-w-3xl">
          Coordinate safety investigations, product recalls, inventory quarantine, customer
          communications, regulatory reporting and recovery operations across the beauty
          marketplace.
        </p>
      </div>

      {/* Header actions */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={onExportReport}
          className="flex items-center gap-1.5 text-[12px] bg-white border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-medium whitespace-nowrap"
        >
          <Download size={13} />
          Export Recall Report
        </button>
        <button
          type="button"
          onClick={onReviewCritical}
          className="flex items-center gap-1.5 text-[12px] bg-white border border-red-200 px-3 py-1.5 rounded text-red-700 hover:bg-red-50 shadow-sm font-medium whitespace-nowrap"
        >
          <Eye size={13} />
          Review Critical
        </button>
        <button
          type="button"
          onClick={onStartAssessment}
          className="flex items-center gap-1.5 text-[12px] bg-white border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-medium whitespace-nowrap"
        >
          <ClipboardCheck size={13} />
          Start Recall Assessment
        </button>
        <button
          type="button"
          onClick={onCreateIncident}
          className="flex items-center gap-1.5 text-[12px] bg-[#7a0023] text-white px-3 py-1.5 rounded hover:bg-[#6a001f] shadow-sm font-bold whitespace-nowrap"
        >
          <Plus size={13} />
          Create Safety Incident
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 text-[12px] bg-white border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-medium whitespace-nowrap"
        >
          <MoreHorizontal size={13} />
          More Actions
        </button>
      </div>
    </div>
  );
}
