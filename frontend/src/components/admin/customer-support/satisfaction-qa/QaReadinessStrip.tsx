'use client';

import React from 'react';

interface QaReadinessStripProps {
  activeReadinessFilter?: string;
  onSelectReadinessFilter?: (filter: string) => void;
}

export function QaReadinessStrip({
  activeReadinessFilter = 'All',
  onSelectReadinessFilter,
}: QaReadinessStripProps) {
  const chips = [
    { label: 'Healthy', count: 512, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', countBg: 'bg-emerald-200 text-emerald-900' },
    { label: 'Needs Attention', count: 62, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
    { label: 'Critical Defect', count: 7, bg: 'bg-rose-50 text-rose-700 border-rose-200', countBg: 'bg-rose-200 text-rose-900' },
    { label: 'Low CSAT', count: 38, bg: 'bg-rose-50 text-rose-700 border-rose-200', countBg: 'bg-rose-200 text-rose-900' },
    { label: 'Review Due', count: 24, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
    { label: 'Calibration Due', count: 6, bg: 'bg-purple-50 text-purple-700 border-purple-200', countBg: 'bg-purple-200 text-purple-900' },
    { label: 'Appeal Open', count: 5, bg: 'bg-blue-50 text-blue-700 border-blue-200', countBg: 'bg-blue-200 text-blue-900' },
    { label: 'Improvement Action', count: 12, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', countBg: 'bg-emerald-200 text-emerald-900' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-bold text-slate-700 text-xs">Satisfaction &amp; QA Readiness:</span>
      <div className="flex flex-wrap items-center gap-1.5">
        {chips.map((c, i) => {
          const isSelected = activeReadinessFilter === c.label;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectReadinessFilter && onSelectReadinessFilter(c.label)}
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
