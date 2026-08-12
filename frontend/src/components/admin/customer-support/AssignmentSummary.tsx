'use client';

import React from 'react';
import { Users, Bot, Clock } from 'lucide-react';

export function AssignmentSummary() {
  const breakdown = [
    { label: 'Assigned Today', count: '215', percent: '78%' },
    { label: 'Reassigned Today', count: '48', percent: '17%' },
    { label: 'Auto Assigned', count: '154', percent: '56%' },
    { label: 'Pending Assignment', count: '46', percent: '18%' },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          Assignment Summary
        </h3>
        <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors">
          View All
        </button>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="bg-canvas border border-line rounded-lg p-2 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-slate-500 mb-0.5">
            <Users size={12} />
            <span className="text-[9px] font-semibold uppercase">Total Agents</span>
          </div>
          <span className="text-sm font-extrabold text-ink">128</span>
        </div>

        <div className="bg-canvas border border-line rounded-lg p-2 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-slate-500 mb-0.5">
            <Bot size={12} className="text-sky-600" />
            <span className="text-[9px] font-semibold uppercase">Auto Assists</span>
          </div>
          <span className="text-sm font-extrabold text-ink">12</span>
        </div>

        <div className="bg-canvas border border-line rounded-lg p-2 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-slate-500 mb-0.5">
            <Clock size={12} className="text-orange-500" />
            <span className="text-[9px] font-semibold uppercase">Pending</span>
          </div>
          <span className="text-sm font-extrabold text-orange-600">46</span>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="divide-y divide-slate-100 text-[11px]">
        {breakdown.map((item) => (
          <div key={item.label} className="py-1.5 flex items-center justify-between">
            <span className="text-slate-600">{item.label}</span>
            <div className="flex items-center gap-3">
              <strong className="text-ink">{item.count}</strong>
              <span className="text-slate-400 font-medium w-8 text-right">{item.percent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
