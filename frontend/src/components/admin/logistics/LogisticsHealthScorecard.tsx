"use client";

import React from "react";
import { ShieldCheck, Info } from "lucide-react";

export interface ScorecardItem {
  name: string;
  score: number;
  status: "Optimal" | "Healthy" | "At Risk" | "Not Assessed";
  color: string;
}

export function LogisticsHealthScorecard({ items }: { items?: ScorecardItem[] }) {
  const defaultItems = [
    { name: "Fulfilment Readiness", score: 91, status: "Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-600" },
    { name: "Inventory Allocation", score: 88, status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-500" },
    { name: "Pick-and-Pack Performance", score: 90, status: "Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-600" },
    { name: "Logistics Readiness", score: 92, status: "Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-600" },
    { name: "Carrier Pickup Performance", score: 87, status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-500" },
    { name: "Delivery SLA Compliance", score: 91, status: "Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-600" },
    { name: "Proof-of-Delivery Completeness", score: 93, status: "Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-600" },
    { name: "Reverse Logistics Performance", score: 88, status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-500" },
    { name: "Cost & Reconciliation Health", score: 86, status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-500" },
    { name: "Audit Completeness", score: 94, status: "Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-600" },
  ];

  const displayItems = items && items.length > 0
    ? items.map(item => ({
        ...item,
        barColor: item.score >= 90 ? "bg-emerald-600" : item.score >= 80 ? "bg-emerald-500" : "bg-amber-500"
      }))
    : defaultItems;

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary-900" />
          <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider">
            Logistics Operations Health Scorecard
          </h3>
        </div>
        <div className="text-[11px] text-muted flex items-center gap-1">
          <Info size={12} />
          <span>Automated multi-factor operational health evaluation</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {displayItems.map((item, idx) => (
          <div key={idx} className="p-3 bg-canvas border border-line rounded-lg flex flex-col justify-between space-y-2">
            <div className="text-[11px] font-medium text-muted truncate">{item.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-ink">{item.score}%</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${item.color}`}>
                {item.status}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className={`h-full rounded-full ${item.barColor}`} style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
