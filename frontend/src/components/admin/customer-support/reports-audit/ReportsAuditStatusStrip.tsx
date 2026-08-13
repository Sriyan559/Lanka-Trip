'use client';

import React from 'react';

interface ReportsAuditStatusStripProps {
  activeStatusChip?: string;
  onSelectStatusChip?: (chip: string) => void;
}

export function ReportsAuditStatusStrip({
  activeStatusChip = 'All',
  onSelectStatusChip,
}: ReportsAuditStatusStripProps) {
  const chips = [
    { label: 'Healthy', count: 142, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', countBg: 'bg-emerald-200 text-emerald-900' },
    { label: 'Retention Exceptions', count: 1, bg: 'bg-rose-50 text-rose-700 border-rose-200', countBg: 'bg-rose-200 text-rose-900' },
    { label: 'Failed Jobs', count: 2, bg: 'bg-rose-50 text-rose-700 border-rose-200', countBg: 'bg-rose-200 text-rose-900' },
    { label: 'Pending Transfers', count: 3, bg: 'bg-blue-50 text-blue-700 border-blue-200', countBg: 'bg-blue-200 text-blue-900' },
    { label: 'Approval Pending', count: 2, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
    { label: 'Retention Expiring', count: 8, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
    { label: 'Audit Warnings', count: 5, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-bold text-slate-700 text-xs">Reports &amp; Audit Health:</span>
      <div className="flex flex-wrap items-center gap-1.5">
        {chips.map((c, i) => {
          const isSelected = activeStatusChip === c.label;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectStatusChip && onSelectStatusChip(c.label)}
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
      </div>
    </div>
  );
}
