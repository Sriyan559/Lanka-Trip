"use client";

import React from "react";
import { ForecastingHealthRailData } from "@/data/analytics/forecastingIntelligenceData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ForecastingHealthRailProps {
  data: ForecastingHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function ForecastingHealthRail({
  data,
  className = "",
  onActionClick,
}: ForecastingHealthRailProps) {
  const {
    healthScore,
    label,
    subtext,
    enterpriseOutlook,
    targetSummary,
    capacitySummary,
    financeOutlook,
    riskOutlook,
    modelSummary,
    quickQueues,
  } = data;

  const actionButtons = [
    "Generate Enterprise Forecast Report",
    "Compare Scenarios",
    "Review Forecast Risks",
    "Review Inventory Outlook",
    "Review Revenue Forecast",
    "Review Cash Forecast",
    "Review Support Capacity",
    "Review Risk Outlook",
    "Run Enterprise Forecast",
    "Open Forecast Analytics Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* 1. Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Forecasting &amp; Planning Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={84} strokeWidth={7} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block">{label}</span>
        <span className="text-[10px] text-slate-500 block mt-0.5">{subtext}</span>
      </div>

      {/* 2. Enterprise Outlook (Next 90 Days) */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Enterprise Outlook <span className="text-[10px] font-normal text-slate-400">(Next 90 Days)</span>
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Revenue</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{enterpriseOutlook.revenue}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {enterpriseOutlook.revenueTrend}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Orders</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{enterpriseOutlook.orders}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {enterpriseOutlook.ordersTrend}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Customers</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{enterpriseOutlook.customers}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {enterpriseOutlook.customersTrend}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Gross Margin</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{enterpriseOutlook.grossMargin}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {enterpriseOutlook.grossMarginTrend}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cash Position</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{enterpriseOutlook.cashPosition}</span>
            <span className="text-[10px] font-bold text-rose-600 inline-flex items-center">
              <ArrowDown size={9} /> {enterpriseOutlook.cashTrend}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Target Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Target Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Above Target</span>
          <span className="font-bold text-emerald-700">{targetSummary.aboveTarget}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">On Target</span>
          <span className="font-bold text-slate-900">{targetSummary.onTarget}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Watch</span>
          <span className="font-bold text-amber-700">{targetSummary.watch}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">At Risk</span>
          <span className="font-bold text-rose-700">{targetSummary.atRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Critical</span>
          <span className="font-bold text-rose-700">{targetSummary.critical}</span>
        </div>
      </div>

      {/* 4. Capacity Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Capacity Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Supplier Gaps</span>
          <span className="font-bold text-slate-900">{capacitySummary.supplierGaps}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Warehouse Gaps</span>
          <span className="font-bold text-amber-700">{capacitySummary.warehouseGaps}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Carrier Gaps</span>
          <span className="font-bold text-slate-900">{capacitySummary.carrierGaps}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Support Gaps</span>
          <span className="font-bold text-rose-700">{capacitySummary.supportGaps}</span>
        </div>
        <div className="flex justify-between py-0.5 font-bold">
          <span className="text-slate-700">Total Gaps</span>
          <span className="text-rose-700">{capacitySummary.totalGaps}</span>
        </div>
      </div>

      {/* 5. Finance Outlook (Next 90 Days) */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Finance Outlook <span className="text-[10px] font-normal text-slate-400">(Next 90 Days)</span>
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Revenue</span>
          <span className="font-bold text-slate-900">{financeOutlook.revenue}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Gross Margin</span>
          <span className="font-bold text-emerald-700">{financeOutlook.grossMargin}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Operating Cash Flow</span>
          <span className="font-bold text-slate-900">{financeOutlook.operatingCashFlow}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Ending Cash</span>
          <span className="font-bold text-slate-900">{financeOutlook.endingCash}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Current Ratio</span>
          <span className="font-bold text-slate-900">{financeOutlook.currentRatio}</span>
        </div>
      </div>

      {/* 6. Risk Outlook */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Risk Outlook
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Critical Risks</span>
          <span className="font-bold text-rose-700">{riskOutlook.criticalRisks}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Compliance Forecast</span>
          <span className="font-bold text-emerald-700">{riskOutlook.complianceForecast}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Policy Violations</span>
          <span className="font-bold text-slate-900">{riskOutlook.policyViolations}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Financial Exposure</span>
          <span className="font-bold text-rose-700">{riskOutlook.financialExposure}</span>
        </div>
      </div>

      {/* 7. Model & Forecast Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Model &amp; Forecast Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Models Healthy</span>
          <span className="font-bold text-emerald-700">{modelSummary.modelsHealthy}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Models Moving</span>
          <span className="font-bold text-amber-700">{modelSummary.modelsMoving}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Watch</span>
          <span className="font-bold text-slate-900">{modelSummary.watch}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Overall Forecast Confidence</span>
          <span className="font-bold text-emerald-700">{modelSummary.overallConfidence}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Drift</span>
          <span className="font-bold text-slate-900">{modelSummary.drift}</span>
        </div>
      </div>

      {/* 8. Quick Queues */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[11px]">
          {quickQueues.map((qq, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5">
              <span className="text-slate-600 font-medium truncate">{qq.label}</span>
              <span
                className={`font-extrabold text-[11px] px-1.5 rounded ${
                  qq.type === "danger"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : qq.type === "warning"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {qq.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Final Actions */}
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
              className={`w-full py-1.5 px-2.5 font-semibold text-[11px] border rounded transition-colors text-center cursor-pointer shadow-2xs ${
                idx === 0 || idx === 8
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
