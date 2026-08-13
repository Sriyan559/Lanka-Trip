'use client';

import React from 'react';

export function WorkforceContextBar() {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs text-[10px] flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-slate-600">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <div>
          <span className="text-slate-400 block font-medium">Tenant</span>
          <strong className="text-slate-900">SL Beauty</strong>
        </div>
        <span className="text-slate-200">|</span>
        <div>
          <span className="text-slate-400 block font-medium">Ecosystem</span>
          <strong className="text-slate-900">Beauty Marketplace</strong>
        </div>
        <span className="text-slate-200">|</span>
        <div>
          <span className="text-slate-400 block font-medium">Business Unit</span>
          <strong className="text-slate-900">All Business Units</strong>
        </div>
        <span className="text-slate-200">|</span>
        <div>
          <span className="text-slate-400 block font-medium">Region</span>
          <strong className="text-slate-900">Sri Lanka</strong>
        </div>
        <span className="text-slate-200">|</span>
        <div>
          <span className="text-slate-400 block font-medium">Support Scope</span>
          <strong className="text-slate-900">All Customer Support</strong>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-l border-slate-200 pl-3">
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Workforce Source:</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>
        <span className="text-slate-200">|</span>
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Case Source:</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>
        <span className="text-slate-200">|</span>
        <div className="flex items-center gap-1">
          <span className="text-slate-400">SLA Source:</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>
        <span className="text-slate-200">|</span>
        <div className="flex items-center gap-1">
          <span className="text-slate-400">QA Source:</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>
        <span className="text-slate-200">|</span>
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Schedule Source:</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>
        <span className="text-slate-200">|</span>
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Routing Engine:</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Healthy
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-l border-slate-200 pl-3">
        <div>
          <span className="text-slate-400 block font-medium">Workforce Policy</span>
          <span className="font-mono font-bold text-slate-800">SUP-WFM-v6</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Data Completeness</span>
          <strong className="text-slate-900">98%</strong>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Last Synced</span>
          <span className="text-slate-700 font-medium">Jul 22, 2025 10:15 AM</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium">Access</span>
          <span className="text-slate-700 font-medium">Assigned business context</span>
        </div>
      </div>
    </div>
  );
}
