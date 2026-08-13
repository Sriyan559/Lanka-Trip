'use client';

import React from 'react';

interface WorkforceStatusChipsProps {
  activeStatusFilter?: string;
  onSelectStatusFilter?: (status: string) => void;
}

export function WorkforceStatusChips({
  activeStatusFilter = 'All',
  onSelectStatusFilter,
}: WorkforceStatusChipsProps) {
  const chips = [
    { label: 'At Capacity', count: 18, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
    { label: 'Overloaded', count: 6, bg: 'bg-rose-50 text-rose-700 border-rose-200', countBg: 'bg-rose-200 text-rose-900' },
    { label: 'SLA At Risk', count: 29, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
    { label: 'Low CSAT', count: 7, bg: 'bg-rose-50 text-rose-700 border-rose-200', countBg: 'bg-rose-200 text-rose-900' },
    { label: 'High Escalations', count: 8, bg: 'bg-rose-50 text-rose-700 border-rose-200', countBg: 'bg-rose-200 text-rose-900' },
    { label: 'Coaching Due', count: 11, bg: 'bg-purple-50 text-purple-700 border-purple-200', countBg: 'bg-purple-200 text-purple-900' },
    { label: 'New Agents', count: 12, bg: 'bg-blue-50 text-blue-700 border-blue-200', countBg: 'bg-blue-200 text-blue-900' },
    { label: 'Skill Gap', count: 14, bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', countBg: 'bg-indigo-200 text-indigo-900' },
    { label: 'Queue Risk', count: 9, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
    { label: 'Schedule Gap', count: 6, bg: 'bg-blue-50 text-blue-700 border-blue-200', countBg: 'bg-blue-200 text-blue-900' },
    { label: 'High Workload Trend', count: 7, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', countBg: 'bg-emerald-200 text-emerald-900' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-bold text-slate-700 text-xs">Function: <strong className="text-slate-900">All</strong></span>
      <span className="text-slate-300">|</span>
      <span className="font-bold text-slate-700 text-xs">Show: <strong className="text-slate-900">All</strong></span>

      <div className="flex flex-wrap items-center gap-1.5 ml-1">
        {chips.map((c, i) => {
          const isSelected = activeStatusFilter === c.label;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectStatusFilter && onSelectStatusFilter(c.label)}
              className={`flex items-center gap-1 px-2 py-0.5 border rounded-full font-medium text-[10px] transition-colors ${c.bg} ${
                isSelected ? 'ring-2 ring-slate-400 font-bold' : ''
              }`}
            >
              <span>{c.label}</span>
              <span className={`px-1 py-0.1 rounded-full font-bold text-[9px] ${c.countBg}`}>
                {c.count}
              </span>
            </button>
          );
        })}
        <span className="text-[10px] text-slate-400 ml-1 font-medium">Updated Within: <strong>1h</strong></span>
      </div>
    </div>
  );
}
