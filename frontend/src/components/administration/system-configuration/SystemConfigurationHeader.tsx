'use client';

import React from 'react';
import { Plus, Edit3, ShieldAlert, GitCompare, Download, MoreHorizontal } from 'lucide-react';

interface SystemConfigurationHeaderProps {
  onCreateConfiguration: () => void;
  onRequestChange: () => void;
  onReviewDrift: () => void;
  onCompareEnvironments: () => void;
  onExportRegistry: () => void;
}

export function SystemConfigurationHeader({
  onCreateConfiguration,
  onRequestChange,
  onReviewDrift,
  onCompareEnvironments,
  onExportRegistry,
}: SystemConfigurationHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      {/* Title & Description */}
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          System Configuration & Global Settings
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-3xl leading-normal">
          Define and govern enterprise configuration defaults, scoped overrides, environment-specific values, validation, drift, ownership, release readiness and change control across the retail ecosystem.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onCreateConfiguration}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Configuration</span>
        </button>

        <button
          type="button"
          onClick={onRequestChange}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5 text-gray-500" />
          <span>Request Configuration Change</span>
        </button>

        <button
          type="button"
          onClick={onReviewDrift}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Review Configuration Drift</span>
        </button>

        <button
          type="button"
          onClick={onCompareEnvironments}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <GitCompare className="w-3.5 h-3.5 text-gray-500" />
          <span>Compare Environments</span>
        </button>

        <button
          type="button"
          onClick={onExportRegistry}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Configuration Registry</span>
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
export default SystemConfigurationHeader;
