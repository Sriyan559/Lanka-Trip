"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface WarehouseContextBarProps {
  onRefresh?: () => void;
}

export function WarehouseContextBar({ onRefresh }: WarehouseContextBarProps) {
  const contextItems = [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "SL Beauty Retail" },
    { label: "Sales Channels", value: "B2C, Marketplace, B2B" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Base Currency", value: "LKR" },
    { label: "Warehouse Scope", value: "All Facilities" },
    { label: "Operational Period", value: "May 2026" },
    { label: "Date Range", value: "01 May – 31 May 2026" },
  ];

  const healthServices = [
    { label: "Allocation Service Health", status: "Healthy" },
    { label: "Warehouse Service Health", status: "Healthy" },
    { label: "Picking Service Health", status: "Healthy" },
    { label: "Packing Service Health", status: "Healthy" },
    { label: "Delivery Service Health", status: "Healthy" },
    { label: "Dispatch Service Health", status: "Healthy" },
    { label: "Transfer Service Health", status: "Healthy" },
    { label: "Return Receive Health", status: "Healthy" },
    { label: "Return Tracking Health", status: "Healthy" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-2.5 shadow-sm space-y-2 text-[10px]">
      {/* ROW 1: BUSINESS CONTEXT */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-muted">Completeness:</span>
            <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
              98.7%
            </span>
          </div>

          <div className="flex items-center gap-1 text-muted">
            <span>Last Synced:</span>
            <strong className="text-ink font-semibold">2 mins ago</strong>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            Registry: Healthy
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            Inventory: Healthy
          </div>
        </div>
      </div>

      {/* ROW 2: SERVICE HEALTH */}
      <div className="pt-2 border-t border-line flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px]">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {healthServices.map((service, idx) => (
            <div key={idx} className="flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-muted">{service.label}:</span>
              <span className="font-bold text-emerald-700">{service.status}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2.5 text-muted border-l border-line pl-2.5 flex-shrink-0">
          <div>Access Context: <strong className="text-ink font-semibold">Admin Full Access</strong></div>
          <div>Version Policy: <strong className="text-ink font-semibold">Current Only</strong></div>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="p-0.5 rounded hover:bg-canvas text-muted hover:text-ink transition-colors"
              title="Refresh warehouse health"
            >
              <RefreshCw size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
