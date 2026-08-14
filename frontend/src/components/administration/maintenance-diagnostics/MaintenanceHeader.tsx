'use client';

import React from 'react';
import { Plus, HeartPulse, AlertOctagon, ListOrdered, Download, MoreHorizontal } from 'lucide-react';

interface MaintenanceHeaderProps {
  onCreateTask: () => void;
  onRunHealthChecks: () => void;
  onReviewFailedJobs: () => void;
  onReviewQueueBacklog: () => void;
  onExportRegistry: () => void;
}

export function MaintenanceHeader({
  onCreateTask,
  onRunHealthChecks,
  onReviewFailedJobs,
  onReviewQueueBacklog,
  onExportRegistry,
}: MaintenanceHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Maintenance, Diagnostics, System Jobs & Operational Administration
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-3xl leading-normal">
          Operational oversight of system jobs, queues, workers, services, health, maintenance, and diagnostics across the platform.
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onCreateTask}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Maintenance Task</span>
        </button>

        <button
          type="button"
          onClick={onRunHealthChecks}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
          <span>Run Health Checks</span>
        </button>

        <button
          type="button"
          onClick={onReviewFailedJobs}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
          <span>Review Failed Jobs</span>
        </button>

        <button
          type="button"
          onClick={onReviewQueueBacklog}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <ListOrdered className="w-3.5 h-3.5 text-amber-600" />
          <span>Review Queue Backlog</span>
        </button>

        <button
          type="button"
          onClick={onExportRegistry}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Operations Registry</span>
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
export default MaintenanceHeader;
