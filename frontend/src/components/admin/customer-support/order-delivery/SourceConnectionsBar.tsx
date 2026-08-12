"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function SourceConnectionsBar() {
  return (
    <div className="w-full bg-slate-50/80 border border-slate-200 rounded-md p-2 mb-4 text-xs flex flex-wrap items-center justify-between gap-y-2 gap-x-4 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-800">Source Connections</span>
        <span className="text-[11px] text-slate-500 font-medium">(All Systems Operational)</span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        {/* Fulfilment Source */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Fulfilment Source</span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={12} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Shipment Source */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Shipment Source</span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={12} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Carrier Source */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Carrier Source</span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={12} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Last Sync */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Last Sync</span>
          <span className="font-semibold text-slate-900">9:37 AM</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Data Completeness */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Data Completeness</span>
          <span className="font-bold text-slate-900">98%</span>
        </div>
      </div>
    </div>
  );
}
