"use client";

import React from "react";

export function FulfilmentScorecard() {
  const metrics = [
    { name: "Order Readiness", score: 82, color: "bg-emerald-600" },
    { name: "Inventory Availability", score: 94, color: "bg-emerald-600" },
    { name: "Allocation Efficiency", score: 91, color: "bg-emerald-600" },
    { name: "Picking Performance", score: 89, color: "bg-emerald-500" },
    { name: "Packing Performance", score: 87, color: "bg-emerald-500" },
    { name: "Quality Compliance", score: 96, color: "bg-emerald-600" },
    { name: "Dispatch Readiness", score: 85, color: "bg-emerald-500" },
    { name: "Exception Resolution", score: 78, color: "bg-amber-500" },
    { name: "SLA Compliance", score: 90, color: "bg-emerald-600" },
    { name: "Audit Completeness", score: 89, color: "bg-emerald-500" },
    { name: "Audit Governance", score: 88, color: "bg-emerald-500" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider">
          Fulfilment Performance Scorecard
        </h3>
        <span className="text-[10px] text-muted">11 Operational Dimensions</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2.5">
        {metrics.map((item, idx) => (
          <div key={idx} className="p-2 bg-canvas border border-line rounded-lg flex flex-col justify-between space-y-1.5">
            <span className="text-[10px] font-medium text-muted truncate">{item.name}</span>
            <div className="text-sm font-bold text-ink">{item.score}%</div>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
