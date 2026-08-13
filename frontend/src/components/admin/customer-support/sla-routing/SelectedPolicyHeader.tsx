'use client';

import React from 'react';

interface SelectedPolicyHeaderProps {
  policyName: string;
  policyId: string;
  status: string;
}

export function SelectedPolicyHeader({ policyName, policyId, status }: SelectedPolicyHeaderProps) {
  return (
    <div className="flex items-center gap-2 pt-1 pb-1">
      <h3 className="text-sm font-bold text-slate-900">
        {policyName} <span className="font-mono font-normal text-slate-500">({policyId})</span>
      </h3>
      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        {status}
      </span>
    </div>
  );
}

export function SelectedPolicyMetrics() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 bg-white border border-slate-200 rounded-md p-2 shadow-2xs">
      <div className="border-r border-slate-100 pr-2">
        <span className="text-[10px] text-slate-400 font-medium block">First Response</span>
        <span className="text-base font-extrabold text-slate-900 leading-tight block">15m</span>
        <span className="text-[10px] text-slate-400">Target 15m</span>
      </div>

      <div className="border-r border-slate-100 pr-2">
        <span className="text-[10px] text-slate-400 font-medium block">Update Interval</span>
        <span className="text-base font-extrabold text-slate-900 leading-tight block">2h</span>
        <span className="text-[10px] text-slate-400">Target 2h</span>
      </div>

      <div className="border-r border-slate-100 pr-2">
        <span className="text-[10px] text-slate-400 font-medium block">Resolution</span>
        <span className="text-base font-extrabold text-slate-900 leading-tight block">6h</span>
        <span className="text-[10px] text-slate-400">Target 6h</span>
      </div>

      <div className="border-r border-slate-100 pr-2">
        <span className="text-[10px] text-slate-400 font-medium block">Escalation At</span>
        <span className="text-base font-extrabold text-amber-600 leading-tight block">75%</span>
        <span className="text-[10px] text-slate-400">Breaches at 100%</span>
      </div>

      <div className="border-r border-slate-100 pr-2">
        <span className="text-[10px] text-slate-400 font-medium block">Applied Queues</span>
        <span className="text-base font-extrabold text-slate-900 leading-tight block">3</span>
        <span className="text-[10px] text-slate-400">Queues</span>
      </div>

      <div className="border-r border-slate-100 pr-2">
        <span className="text-[10px] text-slate-400 font-medium block">Cases Covered</span>
        <span className="text-base font-extrabold text-slate-900 leading-tight block">7,284</span>
        <span className="text-[10px] text-slate-400">Last 30 Days</span>
      </div>

      <div className="border-r border-slate-100 pr-2">
        <span className="text-[10px] text-slate-400 font-medium block">SLA Compliance</span>
        <span className="text-base font-extrabold text-emerald-600 leading-tight block">97%</span>
        <span className="text-[10px] text-slate-400">30 Days</span>
      </div>

      <div>
        <span className="text-[10px] text-slate-400 font-medium block">Policy Health</span>
        <span className="text-base font-extrabold text-emerald-600 leading-tight block">97%</span>
        <span className="text-[10px] font-semibold text-emerald-600">Excellent</span>
      </div>
    </div>
  );
}
