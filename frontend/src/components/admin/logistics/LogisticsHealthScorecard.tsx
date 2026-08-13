"use client";

import React from "react";

export interface ScorecardItem {
  name: string;
  score: number;
  status: "Optimal" | "Healthy" | "At Risk" | "Not Assessed";
  color?: string;
  barColor?: string;
}

export function LogisticsHealthScorecard({ items }: { items?: ScorecardItem[] }) {
  const defaultItems: ScorecardItem[] = ["Fulfilment Readiness", "Inventory Allocation", "Pick-and-Pack Performance", "Logistics Readiness", "Carrier Pickup Performance", "Delivery SLA Compliance", "Proof-of-Delivery Completeness", "Reverse Logistics Performance", "Cost & Reconciliation Health", "Audit Completeness"].map(name => ({ name, score: 0, status: "Not Assessed", barColor: "bg-gray-300" }));

  const displayItems = items && items.length > 0
    ? items.map(item => ({
        ...item,
        barColor: item.score >= 90 ? "bg-emerald-600" : item.score >= 80 ? "bg-emerald-500" : "bg-amber-500"
      }))
    : defaultItems;

  return (
    <div className="bg-white rounded-xl border border-line shadow-xs p-2 sm:p-2.5 text-[9.5px]">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider">
          Logistics &amp; Customer Health Scorecard
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5">
        {displayItems.map((item, idx) => (
          <div key={idx} className="p-1 bg-canvas border border-line rounded flex flex-col justify-between h-[36px]">
            <div className="flex items-center justify-between gap-0.5">
              <span className="text-[8.5px] font-medium text-muted truncate" title={item.name}>{item.name}</span>
              <span className="text-[9px] font-bold text-ink flex-shrink-0">{item.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div className={`h-full rounded-full ${item.barColor || "bg-emerald-600"}`} style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
