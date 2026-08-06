"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface QualityBusinessContextProps {
  lastSynced: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function QualityBusinessContext({
  lastSynced,
  isRefreshing,
  onRefresh,
}: QualityBusinessContextProps) {
  const fields = [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "All Business Units" },
    { label: "Sales Channel", value: "All Channels" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Currency", value: "LKR" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg px-4 py-2.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-[11.5px] mb-4">
      {/* Field Items */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-1.5">
            <span className="text-muted font-medium">{f.label}:</span>
            <span className="font-bold text-ink">{f.value}</span>
          </div>
        ))}
      </div>

      {/* Live Data & Refresh */}
      <div className="flex items-center gap-4 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-700">Live Data</span>
          <span className="text-muted ml-1">Last synced: {lastSynced}</span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1 text-slate-500 hover:text-ink hover:bg-slate-100 rounded transition-colors"
          title="Refresh Data"
        >
          <RefreshCw size={13} className={isRefreshing ? "animate-spin text-[#671021]" : ""} />
        </button>
      </div>
    </div>
  );
}
