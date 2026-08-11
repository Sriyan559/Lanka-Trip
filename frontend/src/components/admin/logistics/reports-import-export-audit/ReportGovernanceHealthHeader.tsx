"use client";

import React from "react";
import { CircularProgress } from "../shared/CircularProgress";

export function ReportGovernanceHealthHeader() {
  const scorecardRows = [
    { label: "Reporting Status", pct: 93, trend: "+10%" },
    { label: "Import Validation", pct: 95, trend: "+5%" },
    { label: "Export Governance", pct: 91, trend: "+8%" },
    { label: "Retention Compliance", pct: 98, trend: "+2%" },
    { label: "Audit Completeness", pct: 93, trend: "+5%" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Logistics Data Governance Health
          </h3>
          <p className="text-[10.5px] text-gray-500 font-medium">
            12% Rate | <span className="text-emerald-700 font-semibold">Trend: Stable</span>
          </p>
        </div>

        <CircularProgress
          value={94}
          label=""
          size={58}
          strokeWidth={5}
          color="#10b981"
        />
      </div>

      {/* Governance Scorecard Rows */}
      <div className="space-y-1 pt-1 border-t border-gray-100 text-[10.5px]">
        {scorecardRows.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-gray-600">{row.label}:</span>
            <div className="flex items-center gap-1.5 font-mono font-semibold text-gray-900">
              <span>{row.pct}%</span>
              <span className="text-[9.5px] text-emerald-700 font-bold">{row.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
