"use client";

import React from "react";
import { PriorityInsight } from "@/data/analytics/executivePerformanceData";

interface InsightListProps {
  insights: PriorityInsight[];
  className?: string;
}

export function InsightList({ insights = [], className = "" }: InsightListProps) {
  return (
    <div className={`space-y-2 text-xs ${className}`}>
      {insights.map((item) => {
        let badgeStyle = "bg-sky-50 text-sky-600 border-sky-200";
        if (item.impact === "High") {
          badgeStyle = "bg-emerald-50 text-emerald-600 border-emerald-300 font-extrabold";
        } else if (item.impact === "Medium") {
          badgeStyle = "bg-amber-50 text-amber-600 border-amber-300 font-bold";
        }

        return (
          <div
            key={item.id}
            className="flex items-start justify-between gap-2 p-2.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors"
          >
            <span className="text-slate-900 font-bold text-[11px] leading-snug">{item.insight}</span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider border shrink-0 ${badgeStyle}`}>
              {item.impact}
            </span>
          </div>
        );
      })}
    </div>
  );
}
