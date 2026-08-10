"use client";

import React from "react";
import { Activity, ShieldCheck, Cpu, RefreshCw } from "lucide-react";

interface FulfilmentDetailContextBarProps {
  onRefresh?: () => void;
}

export function FulfilmentDetailContextBar({ onRefresh }: FulfilmentDetailContextBarProps) {
  const contextItems = [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "Consumer Beauty" },
    { label: "Sales Channel", value: "Marketplace Web" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Base Currency", value: "LKR" },
    { label: "Fulfilment Scope", value: "Active Fulfilment Network" },
    { label: "Operational Period", value: "May 2026" },
  ];

  const healthServices = [
    { label: "Warehouse Service Health", status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Allocation Service Health", status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Picking Service Health", status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Packing Service Health", status: "Stable", color: "text-amber-700 bg-amber-50 border-amber-200" },
    { label: "Shipment Service Health", status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  ];

  return (
    <div className="space-y-2">
      {/* CONTEXT STRIP */}
      <div className="bg-white rounded-xl border border-line p-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 flex-1">
          {contextItems.map((item, idx) => (
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
              On
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-muted">Data Completeness:</span>
            <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              96%
            </span>
          </div>
        </div>
      </div>

      {/* SERVICE & RECORD HEALTH STRIP */}
      <div className="bg-white rounded-xl border border-line p-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {healthServices.map((service, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold bg-canvas border-line">
              <span className={`w-1.5 h-1.5 rounded-full ${service.status === 'Stable' ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
              <span className="text-muted">{service.label}:</span>
              <span className={`font-bold px-1.5 py-0.2 rounded border ${service.color}`}>{service.status}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-muted border-l border-line pl-3 flex-shrink-0">
          <div>Access Context: <strong className="text-ink font-semibold">Assigned business context</strong></div>
          <div>Record Version: <strong className="text-ink font-semibold">v3.4</strong></div>
          <div>Last Updated: <strong className="text-ink font-semibold">May 26 2025 10:15 AM</strong></div>
          <div>Updated By: <strong className="text-ink font-semibold">N. Fernando</strong></div>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="p-1 rounded hover:bg-canvas text-muted hover:text-ink transition-colors"
              title="Refresh record"
            >
              <RefreshCw size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
