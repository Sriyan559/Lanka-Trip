'use client';

import React from 'react';
import { Plus, ShieldAlert, FileText, Download, MoreHorizontal } from 'lucide-react';

interface DataGovernanceHeaderProps {
  onRegisterAsset: () => void;
  onCreateRetentionPolicy: () => void;
  onReviewHighRiskData: () => void;
  onReviewRetentionActions: () => void;
  onExportRegistry: () => void;
}

export function DataGovernanceHeader({
  onRegisterAsset,
  onCreateRetentionPolicy,
  onReviewHighRiskData,
  onReviewRetentionActions,
  onExportRegistry,
}: DataGovernanceHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Data Governance, Retention, Privacy & Administrative Data Controls
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-3xl leading-normal">
          Govern enterprise data domains, data ownership, classification, dimensioning, retention, privacy, residency, sharing controls, and administrative data safeguards.
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onRegisterAsset}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Register Data Asset</span>
        </button>

        <button
          type="button"
          onClick={onCreateRetentionPolicy}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-gray-500" />
          <span>Create Retention Policy</span>
        </button>

        <button
          type="button"
          onClick={onReviewHighRiskData}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Review High-Risk Data</span>
        </button>

        <button
          type="button"
          onClick={onReviewRetentionActions}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-amber-600" />
          <span>Review Retention Actions</span>
        </button>

        <button
          type="button"
          onClick={onExportRegistry}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Data Governance Registry</span>
        </button>

        <button
          type="button"
          className="p-1.5 bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 rounded shadow-2xs transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default DataGovernanceHeader;
