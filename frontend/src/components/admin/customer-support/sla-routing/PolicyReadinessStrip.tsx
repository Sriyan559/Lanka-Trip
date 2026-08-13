'use client';

import React from 'react';

export function PolicyReadinessStrip() {
  const readinessItems = [
    { label: 'Healthy', count: 118, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', countBg: 'bg-emerald-200 text-emerald-900' },
    { label: 'Needs Attention', count: 12, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
    { label: 'Conflict', count: 4, bg: 'bg-rose-50 text-rose-700 border-rose-200', countBg: 'bg-rose-200 text-rose-900' },
    { label: 'Coverage Gap', count: 3, bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', countBg: 'bg-indigo-200 text-indigo-900' },
    { label: 'Approval Pending', count: 7, bg: 'bg-purple-50 text-purple-700 border-purple-200', countBg: 'bg-purple-200 text-purple-900' },
    { label: 'Scheduled Change', count: 8, bg: 'bg-blue-50 text-blue-700 border-blue-200', countBg: 'bg-blue-200 text-blue-900' },
    { label: 'Expiring', count: 5, bg: 'bg-orange-50 text-orange-700 border-orange-200', countBg: 'bg-orange-200 text-orange-900' },
    { label: 'Validation Warning', count: 6, bg: 'bg-amber-50 text-amber-700 border-amber-200', countBg: 'bg-amber-200 text-amber-900' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-bold text-slate-700 text-xs">SLA &amp; Routing Readiness</span>
      <div className="flex flex-wrap items-center gap-1.5">
        {readinessItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1 px-2 py-0.5 border rounded-full font-medium text-[11px] ${item.bg}`}
          >
            <span>{item.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full font-bold text-[10px] ${item.countBg}`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
