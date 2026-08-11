"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface AllocationContextBarProps {
  onRefresh?: () => void;
}

export function AllocationContextBar({ onRefresh }: AllocationContextBarProps) {
  const contextItems = [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "All Business Units" },
    { label: "Sales Channels", value: "All Channels" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Base Currency", value: "LKR" },
    { label: "Allocation Scope", value: "Active Allocation & Reservation Network" },
    { label: "Operational Period", value: "May 2025" },
    { label: "Date Range", value: "Last 30 Days" },
  ];

  const healthServices = [
    { label: "Inventory Service Health", status: "Healthy", isGreen: true },
    { label: "Reservation Service Health", status: "Healthy", isGreen: true },
    { label: "Allocation Engine Health", status: "Stable", isGreen: false },
    { label: "Warehouse Availability Health", status: "Healthy", isGreen: true },
    { label: "Transfer Service Health", status: "Healthy", isGreen: true },
    { label: "Batch / Expiry Validation Health", status: "Healthy", isGreen: true },
    { label: "Fulfilment Dependency Health", status: "Healthy", isGreen: true },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-2 sm:p-2.5 shadow-sm space-y-1.5 text-[9.5px]">
      {/* ROW 1: BUSINESS CONTEXT STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {contextItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="text-muted font-medium">{item.label}:</span>
              <span className="font-bold text-ink bg-canvas px-1.5 py-0.2 rounded border border-line">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-l border-line pl-2.5 flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-muted">Live Data:</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded text-[9px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              On
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-muted">Completeness:</span>
            <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1 py-0.2 rounded text-[9px]">
              96%
            </span>
          </div>

          <div className="flex items-center gap-1 text-muted">
            <span>Last Synced:</span>
            <strong className="text-ink font-semibold">May 26 2025 10:15 AM</strong>
          </div>
        </div>
      </div>

      {/* ROW 2: SERVICE HEALTH STRIP */}
      <div className="pt-1.5 border-t border-line flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[9.5px]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {healthServices.map((service, idx) => (
            <div key={idx} className="flex items-center gap-1 font-medium">
              <span className={`w-1.5 h-1.5 rounded-full ${service.isGreen ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
              <span className="text-muted">{service.label}:</span>
              <span className={`font-bold ${service.isGreen ? "text-emerald-700" : "text-amber-700"}`}>{service.status}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2.5 text-muted border-l border-line pl-2.5 flex-shrink-0">
          <div>Access Context: <strong className="text-ink font-semibold">Full Access</strong></div>
          <div>Record Version Policy: <strong className="text-ink font-semibold">v2.6</strong></div>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="p-0.5 rounded hover:bg-canvas text-muted hover:text-ink transition-colors"
              title="Refresh allocation health"
            >
              <RefreshCw size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
