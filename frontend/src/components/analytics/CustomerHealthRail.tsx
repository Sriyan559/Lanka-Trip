"use client";

import React from "react";
import { CustomerHealthRailData } from "@/data/analytics/customersSegmentsData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp } from "lucide-react";

interface CustomerHealthRailProps {
  data: CustomerHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function CustomerHealthRail({
  data,
  className = "",
  onActionClick,
}: CustomerHealthRailProps) {
  const { healthScore, label, summary, quickQueries } = data;

  const actionButtons = [
    "Generate Customer Analysis Report",
    "Review Churn Risks",
    "Review VIP Retention",
    "Review Dormant Customers",
    "Review CLV Decline",
    "Review Loyalty Performance",
    "Run Retention Forecast",
    "Open Customer Analysis Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Customer Analytics Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={90} strokeWidth={8} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block mt-1">{label}</span>
      </div>

      {/* Customer Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Customer Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Customer Count</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{summary.customerCount}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {summary.customerGrowth}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Retention Summary</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{summary.retentionRate}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {summary.retentionDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Value Summary</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{summary.valueSummary}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {summary.valueDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Churn Summary</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{summary.churnSummary}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {summary.churnDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Loyalty Summary</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{summary.loyaltySummary}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {summary.loyaltyDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Queries */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Quick Queries
        </h4>
        <div className="space-y-1 text-[11px]">
          {quickQueries.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5">
              <span className="text-slate-600 font-medium truncate max-w-[140px]">{q.riskType}</span>
              <span className="font-extrabold text-rose-700 text-[11px]">{q.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Actions */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Final Actions
        </h4>
        <div className="space-y-1.5">
          {actionButtons.map((btnText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onActionClick?.(btnText)}
              className={`w-full py-1 px-2.5 font-semibold text-[11px] border rounded transition-colors text-center cursor-pointer shadow-2xs ${
                idx === 0
                  ? "bg-burgundy text-white border-burgundy hover:bg-burgundy-dark font-bold"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              {btnText}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
