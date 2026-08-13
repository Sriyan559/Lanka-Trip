"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function ComplaintsContextBar() {
  return (
    <div className="w-full bg-slate-50/80 border border-slate-200 rounded-md p-2 mb-4 text-xs flex flex-wrap items-center justify-between gap-y-2 gap-x-4 shadow-2xs">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Tenant */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Tenant</span>
          <span className="font-semibold text-slate-900">SL Beauty</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Ecosystem */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Ecosystem</span>
          <span className="font-semibold text-slate-900">Beauty Marketplace</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Business Unit */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Business Unit</span>
          <span className="font-semibold text-slate-900">All Business Units</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Region */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Region</span>
          <span className="font-semibold text-slate-900">Sri Lanka</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Support Scope */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Support Scope</span>
          <span className="font-semibold text-slate-900">All Customer Support</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Complaint Policy */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Complaint Policy</span>
          <span className="font-mono font-semibold text-slate-800">SUP-COMP-v5</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Escalation Policy */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Escalation Policy</span>
          <span className="font-mono font-semibold text-slate-800">SUP-ESC-v6</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Recovery Policy */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Recovery Policy</span>
          <span className="font-mono font-semibold text-slate-800">SUP-REC-v6</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Recovery Policy 2 */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Recovery Policy</span>
          <span className="font-mono font-semibold text-slate-800">SUP-REC-v4</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Customer Source */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Customer Source</span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={11} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        {/* Finance Source */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Finance Source</span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={11} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        {/* Logistics Source */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Logistics Source</span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={11} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        {/* Compliance Source */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Compliance Source</span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={11} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        {/* Data Completeness */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Data Completeness</span>
          <span className="font-semibold text-slate-900">98%</span>
          <span className="text-[10px] text-slate-400">Jul 22, 2025 10:55 AM</span>
        </div>

        {/* Access */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Access</span>
          <span className="font-semibold text-slate-800">assigned business context</span>
        </div>
      </div>
    </div>
  );
}
