"use client";

import React from "react";
import { HealthBadge } from "../shared/HealthBadge";
import { RefreshCw } from "lucide-react";

interface ReportContextBarProps {
  onRefresh?: () => void;
}

export function ReportContextBar({ onRefresh }: ReportContextBarProps) {
  const contextFields = [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "All Business Units" },
    { label: "Sales Channels", value: "All Channels" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Base Currency", value: "LKR" },
    { label: "Data Scope", value: "Active Logistics Data Operations" },
    { label: "Operational Period", value: "May 2025" },
    { label: "Date Range", value: "Last 30 Days" },
    { label: "Live Data", value: "On" },
    { label: "Data Completeness", value: "96%" },
    { label: "Last Synced", value: "May 26, 2025 10:15 AM" },
    { label: "Record Version", value: "v2.6" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs mb-3 space-y-2">
      {/* Top Context Metadata Row */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-2 text-[11px] gap-y-1 gap-x-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {contextFields.map((field, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="text-gray-500">{field.label}:</span>
              <span className="font-semibold text-gray-900">{field.value}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="text-gray-500 hover:text-rose-700 text-[10.5px] font-bold inline-flex items-center gap-1 transition-colors ml-auto"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Refresh</span>
        </button>
      </div>

      {/* 10 Health Status Badges Strip */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pt-0.5 text-[11px]">
        <div className="flex flex-wrap items-center gap-1.5">
          <HealthBadge label="Reporting Service Health" status="Healthy" />
          <HealthBadge label="Import Validation Health" status="Healthy" />
          <HealthBadge label="Export Delivery Health" status="Healthy" />
          <HealthBadge label="Audit Ledger Health" status="Healthy" />
          <HealthBadge label="Malware Scanning Health" status="Healthy" />
          <HealthBadge label="Storage & Retention Health" status="Healthy" />
          <HealthBadge label="Reconciliation Health" status="Healthy" />
          <HealthBadge label="Access Governance Health" status="Healthy" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 font-semibold bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
            Access Context: <strong className="text-blue-700">Assigned business context</strong>
          </span>
          <span className="text-[10px] text-gray-500 font-semibold bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
            Record Version Policy: <strong className="text-gray-800">v2.6</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
