"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface DataOperationsContextProps {
  lastSynced: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function DataOperationsContext({
  lastSynced,
  isRefreshing,
  onRefresh,
}: DataOperationsContextProps) {
  const fields = [
    { label: "Data Scope", value: "Authorized platform catalogue" },
    { label: "Ecosystem", value: "Unavailable" },
    { label: "Business Unit", value: "Unavailable" },
    { label: "Sales Channel", value: "Unavailable" },
    { label: "Region", value: "Unavailable" },
    { label: "Currency", value: "Not applicable" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg px-4 py-2.5 shadow-sm flex flex-wrap items-center justify-between gap-3 text-[11px] mb-4">
      <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">{f.label}</span>
            <span className="font-bold text-ink">{f.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Near-live (30s)</span>
        </div>

        <div className="flex items-center gap-1.5 text-muted text-[11px]">
          <span>Last synced: {lastSynced}</span>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh Data Operations"
            className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-ink transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin text-[#671021]" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
