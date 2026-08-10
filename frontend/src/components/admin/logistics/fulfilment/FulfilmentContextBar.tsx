"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface FulfilmentContextBarProps {
  lastSynced?: string;
  onRefresh?: () => void;
}

export function FulfilmentContextBar({
  lastSynced = "May 26 2025 10:15 AM",
  onRefresh,
}: FulfilmentContextBarProps) {
  const items = [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "All Business Units" },
    { label: "Sales Channels", value: "All Channels" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Base Currency", value: "LKR" },
    { label: "Fulfilment Scope", value: "Active Fulfilment Network" },
    { label: "Operational Period", value: "May 2025" },
    { label: "Date Range", value: "Last 30 Days" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 flex-1">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
            <span className="text-muted font-medium">{item.label}:</span>
            <span className="font-bold text-ink bg-canvas px-2 py-0.5 rounded border border-line">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 border-l border-line pl-3 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="text-muted">Live Data:</span>
          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-muted">Completeness:</span>
          <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            96%
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-muted">
          <span>Last Synced:</span>
          <strong className="text-ink font-semibold">{lastSynced}</strong>
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="p-1 rounded hover:bg-canvas text-muted hover:text-ink transition-colors"
            title="Refresh sync data"
          >
            <RefreshCw size={13} />
          </button>
        )}
      </div>
    </div>
  );
}
