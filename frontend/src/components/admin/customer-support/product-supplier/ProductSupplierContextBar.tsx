"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function ProductSupplierContextBar() {
  return (
    <div className="w-full bg-slate-50/80 border border-slate-200 rounded-md p-2 mb-4 text-xs flex flex-wrap items-center justify-between gap-y-2 gap-x-4 shadow-2xs">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Tenant */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Tenant:</span>
          <span className="font-semibold text-slate-900">SL Beauty</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Ecosystem */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Ecosystem:</span>
          <span className="font-semibold text-slate-900">Beauty Marketplace</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Business Unit */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Business Unit:</span>
          <span className="font-semibold text-slate-900">All Business Units</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Region */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Region:</span>
          <span className="font-semibold text-slate-900">Sri Lanka</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Support Scope */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Support Scope:</span>
          <span className="font-semibold text-slate-900">Product &amp; Supplier</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Connected Sources */}
        {[
          { label: "Catalogue Source:", value: "Connected" },
          { label: "Supplier Source:", value: "Connected" },
          { label: "Compliance Source:", value: "Connected" },
          { label: "Order Source:", value: "Connected" },
          { label: "Customer Source:", value: "Connected" },
        ].map((src, idx) => (
          <React.Fragment key={idx}>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-medium">{src.label}</span>
              <div className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 size={11} className="text-emerald-600" />
                <span>{src.value}</span>
              </div>
            </div>
            {idx < 4 && <div className="h-3 w-px bg-slate-200 hidden sm:block" />}
          </React.Fragment>
        ))}

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Policies */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Product Quality Policy:</span>
          <span className="font-mono font-semibold text-slate-800">SUP-PROQ-v5</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Authenticity Policy:</span>
          <span className="font-mono font-semibold text-slate-800">AUTH-POL-v6</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Data Completeness */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Data Completeness:</span>
          <span className="font-bold text-slate-900">99%</span>
        </div>

        {/* Last Synced */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Last Synced:</span>
          <span className="font-semibold text-slate-900">12 May 2025, 09:41 AM</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Access */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Access:</span>
          <span className="font-semibold text-slate-900">Assigned Business Context</span>
        </div>
      </div>
    </div>
  );
}
