"use client";

import React from "react";
import { RefreshCw, Lock } from "lucide-react";

interface CustomerContextStripProps {
  tenant?: string;
  ecosystem?: string;
  businessUnit?: string;
  salesChannels?: string;
  region?: string;
  currency?: string;
  customerScope?: string;
  recordVersion?: string;
  lastSynced?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function CustomerContextStrip({
  tenant = "SL Beauty",
  ecosystem = "Beauty Marketplace",
  businessUnit = "Consumer Beauty",
  salesChannels = "Marketplace, Mobile App, Retail",
  region = "Sri Lanka",
  currency = "LKR",
  customerScope = "Active Customer Network",
  recordVersion = "v4.2",
  lastSynced = "May 25, 2025 10:15 AM",
  onRefresh,
  isRefreshing = false,
}: CustomerContextStripProps) {
  return (
    <div className="bg-white border border-line rounded-lg px-3 py-2 text-[11px] font-medium text-slate-600 flex flex-wrap items-center justify-between gap-y-1.5 shadow-2xs">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <div>
          <span className="text-slate-400 font-mono text-[10px] uppercase">Tenant</span>
          <span className="ml-1.5 font-bold text-slate-800">{tenant}</span>
        </div>
        <div>
          <span className="text-slate-400 font-mono text-[10px] uppercase">Ecosystem</span>
          <span className="ml-1.5 font-bold text-slate-800">{ecosystem}</span>
        </div>
        <div>
          <span className="text-slate-400 font-mono text-[10px] uppercase">Business Unit</span>
          <span className="ml-1.5 font-bold text-slate-800">{businessUnit}</span>
        </div>
        <div>
          <span className="text-slate-400 font-mono text-[10px] uppercase">Sales Channels</span>
          <span className="ml-1.5 font-bold text-slate-800">{salesChannels}</span>
        </div>
        <div>
          <span className="text-slate-400 font-mono text-[10px] uppercase">Region</span>
          <span className="ml-1.5 font-bold text-slate-800">{region}</span>
        </div>
        <div>
          <span className="text-slate-400 font-mono text-[10px] uppercase">Currency</span>
          <span className="ml-1.5 font-bold text-slate-800">{currency}</span>
        </div>
        <div>
          <span className="text-slate-400 font-mono text-[10px] uppercase">Customer Scope</span>
          <span className="ml-1.5 font-bold text-slate-800">{customerScope}</span>
        </div>
        <div>
          <span className="text-slate-400 font-mono text-[10px] uppercase">Record Version</span>
          <span className="ml-1.5 font-bold text-slate-800">{recordVersion}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[10.5px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-emerald-700">Live Data</span>
        </div>

        <div className="text-slate-400 font-mono">
          Last Synced <span className="text-slate-700 font-semibold">{lastSynced}</span>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <Lock className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] italic">Access limited to assigned business context</span>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-ink transition-colors disabled:opacity-50"
            title="Refresh Context Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        )}
      </div>
    </div>
  );
}
