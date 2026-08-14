'use client';

import React from 'react';
import { Plus, Server, AlertTriangle, Download, MoreHorizontal } from 'lucide-react';

interface CommunicationsHeaderProps {
  onCreateTemplate: () => void;
  onRegisterProvider: () => void;
  onCreateRule: () => void;
  onReviewFailures: () => void;
  onExportRegistry: () => void;
}

export function CommunicationsHeader({
  onCreateTemplate,
  onRegisterProvider,
  onCreateRule,
  onReviewFailures,
  onExportRegistry,
}: CommunicationsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Communications, Notifications & Template Management
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-3xl leading-normal">
          Govern system notifications, delivery channels, providers, templates, routing, localized variants, sender identities, retry/fallback behavior and communication health across the enterprise.
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onCreateTemplate}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Notification Template</span>
        </button>

        <button
          type="button"
          onClick={onRegisterProvider}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Server className="w-3.5 h-3.5 text-gray-500" />
          <span>Register Provider</span>
        </button>

        <button
          type="button"
          onClick={onCreateRule}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-gray-500" />
          <span>Create Notification Rule</span>
        </button>

        <button
          type="button"
          onClick={onReviewFailures}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Review Delivery Failures</span>
        </button>

        <button
          type="button"
          onClick={onExportRegistry}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Communications Registry</span>
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
export default CommunicationsHeader;
