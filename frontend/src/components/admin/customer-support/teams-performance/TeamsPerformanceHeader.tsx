'use client';

import React from 'react';
import { Plus, Shuffle, Users, ChevronDown } from 'lucide-react';

interface TeamsPerformanceHeaderProps {
  onCreateTeam?: () => void;
  onRebalanceWorkloads?: () => void;
  onReviewStaffingGaps?: () => void;
  onMoreActions?: () => void;
}

export function TeamsPerformanceHeader({
  onCreateTeam,
  onRebalanceWorkloads,
  onReviewStaffingGaps,
  onMoreActions,
}: TeamsPerformanceHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <span>Customer Support</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Teams &amp; Performance</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          CS12 — Support Teams, Agent Performance, Capacity &amp; Workforce Management
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
          Monitor workforce performance, capacity, assignments, schedules, skills, staffing risks and support team operations across queues, channels and regions.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onCreateTeam}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          Create / Configure Team
        </button>

        <button
          type="button"
          onClick={onRebalanceWorkloads}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Shuffle size={14} />
          Rebalance Workloads
        </button>

        <button
          type="button"
          onClick={onReviewStaffingGaps}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Users size={14} />
          Review Staffing Gaps
        </button>

        <button
          type="button"
          onClick={onMoreActions}
          className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1"
        >
          More Actions
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
