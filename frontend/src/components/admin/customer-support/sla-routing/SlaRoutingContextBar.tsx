'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

export function SlaRoutingContextBar() {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs text-[11px] flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3 text-slate-700">
      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Tenant</span>
        <span className="font-bold text-slate-900">SL Beauty</span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Ecosystem</span>
        <span className="font-semibold text-slate-800">Beauty Marketplace</span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Business Unit</span>
        <span className="font-semibold text-slate-800">All Business Units</span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Region</span>
        <span className="font-semibold text-slate-800">Sri Lanka</span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Support Scope</span>
        <span className="font-semibold text-slate-800">All Customer Support</span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">SLA Engine</span>
        <span className="font-semibold text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Healthy
        </span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Routing Engine</span>
        <span className="font-semibold text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Healthy
        </span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Escalation Engine</span>
        <span className="font-semibold text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Healthy
        </span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Calendar Source</span>
        <span className="font-semibold text-emerald-600">Connected</span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Policy Store</span>
        <span className="font-semibold text-emerald-600">Connected</span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Active Policy Set</span>
        <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[10px]">
          SUP-POL-v8
        </span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Data Completeness</span>
        <span className="font-bold text-slate-800">99%</span>
      </div>

      <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
        <span className="text-slate-400 font-medium">Last Synced</span>
        <span className="font-medium text-slate-700">Jul 22, 2026 10:15 AM</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-slate-400 font-medium">Access</span>
        <span className="font-medium text-slate-700">Assigned business context</span>
      </div>
    </div>
  );
}
