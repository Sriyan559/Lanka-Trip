'use client';

import React from 'react';
import { CriticalityBadge, DependencyStatusBadge, CompatibilityPercentageBadge } from './DependencyBadges';

interface SelectedDependencyDetailProps {
  from: string;
  to: string;
  type: string;
  relationship: 'Required' | 'Optional' | 'Conditional';
  direction: string;
  criticality: 'High' | 'Medium' | 'Low';
  version: string;
  environment: string;
  status: 'Required' | 'Compatible' | 'Warning' | 'Blocked';
  compatibility: string;
  lastValidated: string;
  onViewDetails?: () => void;
}

export function SelectedDependencyDetail({
  from,
  to,
  type,
  relationship,
  direction,
  criticality,
  version,
  environment,
  status,
  compatibility,
  lastValidated,
  onViewDetails,
}: SelectedDependencyDetailProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-slate-800 mb-3">Selected Dependency Detail</h4>

        {/* From → To */}
        <div className="p-2 bg-slate-50 border border-slate-100 rounded mb-4 text-[10px]">
          <span className="text-[9px] text-slate-400 font-bold block uppercase mb-1">From → To</span>
          <span className="font-bold text-slate-900 block text-sm">{from}</span>
          <span className="text-slate-500 block text-xs">→ {to}</span>
        </div>

        {/* Detail Fields */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">Type</span>
            <span className="font-semibold text-slate-900">{type}</span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">Relationship</span>
            <span className="font-bold text-green-700">{relationship}</span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">Direction</span>
            <span className="font-semibold text-slate-800">{direction}</span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">Criticality</span>
            <CriticalityBadge criticality={criticality} />
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">Version</span>
            <span className="font-mono text-slate-800 text-[10px]">{version}</span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">Environment</span>
            <span className="font-semibold text-slate-800">{environment}</span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">Status</span>
            <DependencyStatusBadge status={status} />
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">Compatibility</span>
            <CompatibilityPercentageBadge compatibility={compatibility} />
          </div>

          <div className="flex justify-between items-center py-1.5">
            <span className="text-slate-600 font-medium">Last Validated</span>
            <span className="text-slate-400 text-[10px]">{lastValidated}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="mt-4 w-full py-2 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
      >
        View Dependency Details
      </button>
    </div>
  );
}
