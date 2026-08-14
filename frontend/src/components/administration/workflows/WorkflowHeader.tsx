'use client';

import React from 'react';
import { Plus, CheckSquare, Clock, Download, MoreHorizontal } from 'lucide-react';

interface WorkflowHeaderProps {
  onCreateWorkflow: () => void;
  onCreatePolicy: () => void;
  onReviewPendingApprovals: () => void;
  onReviewSlaBreaches: () => void;
  onExportRegistry: () => void;
}

export function WorkflowHeader({
  onCreateWorkflow,
  onCreatePolicy,
  onReviewPendingApprovals,
  onReviewSlaBreaches,
  onExportRegistry,
}: WorkflowHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Workflows, Approvals & Administrative Process Control
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-3xl leading-normal">
          Define and govern enterprise workflows, approval chains, routing, SLAs, escalations, administrative actions, workflow process exceptions and controlled decision execution across the ecosystem.
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onCreateWorkflow}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Workflow</span>
        </button>

        <button
          type="button"
          onClick={onCreatePolicy}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-gray-500" />
          <span>Create Approval Policy</span>
        </button>

        <button
          type="button"
          onClick={onReviewPendingApprovals}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
          <span>Review Pending Approvals</span>
        </button>

        <button
          type="button"
          onClick={onReviewSlaBreaches}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Clock className="w-3.5 h-3.5 text-rose-600" />
          <span>Review SLA Breaches</span>
        </button>

        <button
          type="button"
          onClick={onExportRegistry}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Workflow Registry</span>
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
export default WorkflowHeader;
