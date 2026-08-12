"use client";

import React from "react";
import { CommercialHealthRailData } from "@/data/analytics/salesRevenueData";

interface CommercialHealthRailProps {
  data: CommercialHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function CommercialHealthRail({
  data,
  className = "",
  onActionClick,
}: CommercialHealthRailProps) {
  const {
    healthScore,
    label,
    revenueSummary,
    growthVsLy,
    marginSummary,
    leakageSummary,
    quickQueries,
  } = data;

  const quickActionButtons = [
    "Generate Commercial Report",
    "Review Revenue Exceptions",
    "Review Margin Risks",
    "Review Promotion Efficiency",
    "Review Promotion Efficiency",
    "Verify Pricing & Discounts",
    "Run Commercial Forecast",
    "Open Commercial Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Health Score Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col items-center justify-center text-center">
        <h4 className="font-bold text-slate-800 text-xs tracking-tight mb-2">
          Commercial Analytics Health
        </h4>

        <div className="flex items-center justify-center gap-3 my-1">
          {/* Burgundy Metallic Score Ring */}
          <div className="relative w-20 h-20 rounded-full border-4 border-burgundy shadow-inner flex flex-col items-center justify-center bg-white">
            <span className="text-xl font-extrabold text-burgundy tracking-tight leading-none">
              {healthScore}
            </span>
            <span className="text-[9px] font-bold text-slate-400">/100</span>
          </div>

          <span className="font-extrabold text-emerald-600 text-xs">
            {label}
          </span>
        </div>
      </div>

      {/* Revenue Summary (GBP) */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-burgundy text-xs mb-1 tracking-tight">
          Revenue Summary <span className="text-[10px] text-slate-400 font-normal">(GBP)</span>
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Net Revenue</span>
          <span className="font-extrabold text-slate-900">{revenueSummary.netRevenue}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Gross Margin</span>
          <span className="font-extrabold text-slate-900">{revenueSummary.grossMargin}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Margin %</span>
          <span className="font-extrabold text-slate-900">{revenueSummary.marginPercent}</span>
        </div>
      </div>

      {/* Commercial Growth (vs LY) */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-burgundy text-xs mb-1 tracking-tight">
          Commercial Growth <span className="text-[10px] text-slate-400 font-normal">(vs LY)</span>
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Revenue</span>
          <span className="font-extrabold text-emerald-600">
            {growthVsLy.revenue}
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Gross Margin</span>
          <span className="font-extrabold text-emerald-600">
            {growthVsLy.grossMargin}
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Orders</span>
          <span className="font-extrabold text-emerald-600">
            {growthVsLy.orders}
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Units Sold</span>
          <span className="font-extrabold text-emerald-600">
            {growthVsLy.unitsSold}
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">CM %</span>
          <span className="font-extrabold text-emerald-600">
            {growthVsLy.cmPercent}
          </span>
        </div>
      </div>

      {/* Margin Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-burgundy text-xs mb-1 tracking-tight">
          Margin Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Gross Margin</span>
          <span className="font-extrabold text-slate-900">{marginSummary.grossMargin}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Contribution Margin</span>
          <span className="font-extrabold text-slate-900">{marginSummary.contributionMargin}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Discount Impact</span>
          <span className="font-extrabold text-rose-600">{marginSummary.discountImpact}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Opex Impact</span>
          <span className="font-extrabold text-rose-600">{marginSummary.opexImpact}</span>
        </div>
      </div>

      {/* Leakage Summary (GBP) */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-burgundy text-xs mb-1 tracking-tight">
          Leakage Summary <span className="text-[10px] text-slate-400 font-normal">(GBP)</span>
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Total Leakage</span>
          <span className="font-extrabold text-slate-900">{leakageSummary.totalLeakage}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Leakage %</span>
          <span className="font-extrabold text-slate-900">{leakageSummary.leakagePercent}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Pricing Erosion</span>
          <span className="font-extrabold text-slate-900">{leakageSummary.pricingErosion}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-600 font-medium">Stock-Out Leakage</span>
          <span className="font-extrabold text-slate-900">{leakageSummary.stockOutLeakage}</span>
        </div>
      </div>

      {/* Commercial Risks / Quick Queries */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-burgundy text-xs mb-1 tracking-tight">
          Commercial Risks / Quick Queries
        </h4>
        <div className="space-y-1.5 text-[11px]">
          {quickQueries.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5">
              <span className="text-slate-700 font-medium truncate max-w-[150px]">{q.riskType}</span>
              <span className="px-2 py-0.5 rounded-md border border-rose-300 bg-white text-rose-700 font-extrabold text-[10px] min-w-[20px] text-center shadow-2xs">
                {q.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-slate-100 pt-3 space-y-2">
        <h4 className="font-bold text-burgundy text-xs mb-1 tracking-tight">
          Quick Actions
        </h4>
        <div className="space-y-1.5">
          {quickActionButtons.map((btnText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onActionClick?.(btnText)}
              className={`w-full py-2 px-3 font-bold text-xs transition-all duration-200 text-center cursor-pointer shadow-xs ${
                idx === 0
                  ? "text-white rounded-full border border-[#3e0513] bg-[linear-gradient(180deg,#600c20_0%,#9e2040_45%,#50081a_100%)] hover:brightness-110 shadow-md"
                  : "bg-white hover:bg-rose-50/60 text-burgundy border border-rose-300 rounded-lg py-1.5"
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
