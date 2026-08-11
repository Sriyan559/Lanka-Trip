"use client";

import React from "react";

export function FulfilmentScorecard() {
  const metrics = [
    { name: "Order Readiness", score: 82, color: "bg-amber-500" },
    { name: "Inventory Availability", score: 94, color: "bg-emerald-600" },
    { name: "Allocation Efficiency", score: 91, color: "bg-emerald-600" },
    { name: "Picking Performance", score: 89, color: "bg-emerald-600" },
    { name: "Packing Performance", score: 87, color: "bg-emerald-500" },
    { name: "Quality Compliance", score: 96, color: "bg-emerald-600" },
    { name: "Dispatch Readiness", score: 85, color: "bg-amber-500" },
    { name: "Exception Resolution", score: 78, color: "bg-amber-500" },
    { name: "SLA Compliance", score: 90, color: "bg-emerald-600" },
    { name: "Audit Completeness", score: 88, color: "bg-emerald-500" },
    { name: "Audit Governance", score: 88, color: "bg-emerald-500" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-xs p-2 sm:p-2.5 text-[9.5px]">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-1.5">
        {metrics.map((item, idx) => (
          <div key={idx} className="p-1 bg-canvas border border-line rounded flex flex-col justify-between h-[36px]">
            <div className="flex items-center justify-between gap-0.5">
              <span className="text-[8.5px] font-medium text-muted truncate">{item.name}</span>
              <span className="text-[9px] font-bold text-ink flex-shrink-0">{item.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
