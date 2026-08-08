"use client";

import React from "react";
import { CustomerHealthMetricItem } from "@/types/customer";

interface CustomerHealthScorecardProps {
  items?: CustomerHealthMetricItem[];
  title?: string;
}

export function CustomerHealthScorecard({ items, title = "Customer Health Scorecard" }: CustomerHealthScorecardProps) {
  const scorecardItems = items ?? [
    { label: "Identity Verification", val: 88, color: "bg-emerald-500" },
    { label: "Profile Completeness", val: 85, color: "bg-emerald-500" },
    { label: "Engagement", val: 78, color: "bg-emerald-500" },
    { label: "Purchase Frequency", val: 74, color: "bg-amber-500" },
    { label: "Loyalty Participation", val: 71, color: "bg-amber-500" },
    { label: "Service Quality", val: 82, color: "bg-emerald-500" },
    { label: "Return Risk", val: 68, color: "bg-amber-500" },
    { label: "Privacy Compliance", val: 90, color: "bg-emerald-500" },
    { label: "Fraud Risk Control", val: 87, color: "bg-emerald-500" },
    { label: "Retention Readiness", val: 76, color: "bg-emerald-500" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-[11px] font-black text-ink uppercase tracking-wider font-mono">
          {title} <span className="text-[10px] text-muted font-normal uppercase">(vs Target)</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-3">
        {scorecardItems.map((item) => (
          <div key={item.label} className="flex flex-col justify-between p-1.5 bg-slate-50 rounded border border-slate-100">
            <span className="text-[9.5px] font-medium text-slate-600 truncate mb-1" title={item.label}>
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color || (item.val >= 85 ? "bg-emerald-500" : item.val >= 75 ? "bg-amber-500" : "bg-rose-500")} rounded-full`}
                  style={{ width: `${item.val}%` }}
                />
              </div>
              <span className="font-mono font-bold text-[11px] text-slate-800">{item.val}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
