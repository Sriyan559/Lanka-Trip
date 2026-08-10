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
  const defaultItems: ScorecardItem[] = [
    { name: "Fulfilment Readiness", score: 91, status: "Optimal", barColor: "bg-emerald-600" },
    { name: "Inventory Allocation", score: 88, status: "Healthy", barColor: "bg-emerald-500" },
    { name: "Pick-and-Pack Performance", score: 90, status: "Optimal", barColor: "bg-emerald-600" },
    { name: "Logistics Readiness", score: 92, status: "Optimal", barColor: "bg-emerald-600" },
    { name: "Carrier Pickup Performance", score: 87, status: "Healthy", barColor: "bg-emerald-500" },
    { name: "Delivery SLA Compliance", score: 91, status: "Optimal", barColor: "bg-emerald-600" },
    { name: "Proof-of-Delivery Completeness", score: 93, status: "Optimal", barColor: "bg-emerald-600" },
    { name: "Reverse Logistics Performance", score: 88, status: "Healthy", barColor: "bg-emerald-500" },
    { name: "Cost & Reconciliation Health", score: 86, status: "Healthy", barColor: "bg-emerald-500" },
    { name: "Audit Completeness", score: 94, status: "Optimal", barColor: "bg-emerald-600" },
  ];

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
