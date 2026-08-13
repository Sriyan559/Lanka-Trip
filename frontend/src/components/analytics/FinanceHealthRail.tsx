"use client";

import React from "react";
import { FinanceHealthRailData } from "@/data/analytics/financeProfitabilityData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp } from "lucide-react";

interface FinanceHealthRailProps {
  data: FinanceHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function FinanceHealthRail({
  data,
  className = "",
  onActionClick,
}: FinanceHealthRailProps) {
  const {
    healthScore,
    label,
    subtext,
    profitabilitySummary,
    liquiditySummary,
    receivablesPayablesSummary,
    reconciliationHealth,
    leakageInsights,
    taxCompleteness,
    quickActions,
  } = data;

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* 1. Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Finance Analytics Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={84} strokeWidth={7} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block">{label}</span>
        <span className="text-[10px] text-slate-500 block mt-0.5">{subtext}</span>
      </div>

      {/* 2. Profitability Summary (vs Prior) */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Profitability Summary <span className="text-[10px] font-normal text-slate-400">(vs Prior)</span>
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Net Revenue</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{profitabilitySummary.netRevenue}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {profitabilitySummary.netRevenueTrend}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Gross Profit</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{profitabilitySummary.grossProfit}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {profitabilitySummary.grossProfitTrend}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Gross Margin</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{profitabilitySummary.grossMargin}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {profitabilitySummary.grossMarginTrend}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Contribution Profit</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{profitabilitySummary.contributionProfit}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {profitabilitySummary.contributionTrend}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Operating Margin</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{profitabilitySummary.operatingMargin}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {profitabilitySummary.operatingMarginTrend}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Liquidity & Cash Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Liquidity &amp; Cash Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cash on Hand</span>
          <span className="font-bold text-slate-900">{liquiditySummary.cashOnHand}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Available Liquidity</span>
          <span className="font-bold text-slate-900">{liquiditySummary.availableLiquidity}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Operating Cash Flow</span>
          <span className="font-bold text-slate-900">{liquiditySummary.operatingCashFlow}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Current Ratio</span>
          <span className="font-bold text-slate-900">{liquiditySummary.currentRatio}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cash Runway</span>
          <span className="font-bold text-slate-900">{liquiditySummary.cashRunway}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Liquidity Status</span>
          <span className="font-bold text-emerald-700">{liquiditySummary.liquidityStatus}</span>
        </div>
      </div>

      {/* 4. Receivables & Payables Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Receivables &amp; Payables Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Receivables</span>
          <span className="font-bold text-slate-900">{receivablesPayablesSummary.receivables}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Overdue</span>
          <span className="font-bold text-rose-700">{receivablesPayablesSummary.overdue}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">DSO</span>
          <span className="font-bold text-slate-900">{receivablesPayablesSummary.dso}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Payables</span>
          <span className="font-bold text-slate-900">{receivablesPayablesSummary.payables}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">DPO</span>
          <span className="font-bold text-slate-900">{receivablesPayablesSummary.dpo}</span>
        </div>
      </div>

      {/* 5. Reconciliation Health */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Reconciliation Health
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Coverage</span>
          <span className="font-bold text-emerald-700">{reconciliationHealth.coverage}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Unmatched</span>
          <span className="font-bold text-amber-700">{reconciliationHealth.unmatched}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Partially Matched</span>
          <span className="font-bold text-slate-900">{reconciliationHealth.partiallyMatched}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Exposure</span>
          <span className="font-bold text-rose-700">{reconciliationHealth.exposure}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Critical Items</span>
          <span className="font-bold text-rose-700">{reconciliationHealth.criticalItems}</span>
        </div>
      </div>

      {/* 6. Leakage Insights */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Leakage Insights
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Confirmed Leakage</span>
          <span className="font-bold text-slate-900">{leakageInsights.confirmedLeakage}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Potential Leakage</span>
          <span className="font-bold text-amber-700">{leakageInsights.potentialLeakage}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Unreconciled Exposure</span>
          <span className="font-bold text-rose-700">{leakageInsights.unreconciledExposure}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Total Leakage Identified</span>
          <span className="font-bold text-slate-900">{leakageInsights.totalLeakageIdentified}</span>
        </div>
      </div>

      {/* 7. Tax Data Completeness */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Tax Data Completeness
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Tax Data Completeness</span>
          <span className="font-bold text-emerald-700">{taxCompleteness.overallCompleteness}</span>
        </div>
      </div>

      {/* 8. Quick Actions */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Quick Actions
        </h4>
        <div className="space-y-1.5">
          {quickActions.map((btnText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onActionClick?.(btnText)}
              className={`w-full py-1.5 px-2.5 font-semibold text-[11px] border rounded transition-colors text-center cursor-pointer shadow-2xs ${
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
