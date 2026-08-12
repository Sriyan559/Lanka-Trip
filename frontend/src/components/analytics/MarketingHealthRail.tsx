"use client";

import React from "react";
import { MarketingHealthRailData } from "@/data/analytics/marketingData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MarketingHealthRailProps {
  data: MarketingHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function MarketingHealthRail({
  data,
  className = "",
  onActionClick,
}: MarketingHealthRailProps) {
  const {
    healthScore,
    label,
    subtext,
    marketingSummary,
    campaignSummary,
    channelSummary,
    acquisitionSummary,
    attributionSummary,
    riskSummary,
    quickQueues,
  } = data;

  const actionButtons = [
    "Generate Marketing Analytics Report",
    "Review Campaign Risks",
    "Review Channel Performance",
    "Review Creative Fatigue",
    "Review Delivery Exceptions",
    "Run Marketing Forecast",
    "Open Marketing Analytics Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Marketing Analytics Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={90} strokeWidth={8} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block">{label}</span>
        <span className="text-[10px] text-slate-500 block mt-0.5">{subtext}</span>
      </div>

      {/* Marketing Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Marketing Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Marketing Spend</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketingSummary.spend}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketingSummary.spendDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Attributed Revenue</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketingSummary.attribRevenue}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketingSummary.revDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">ROAS</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketingSummary.roas}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketingSummary.roasDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Marketing ROI</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketingSummary.roi}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketingSummary.roiDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">New Customers</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketingSummary.newCustomers}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketingSummary.custDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Campaign Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Campaign Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Active Campaigns</span>
          <span className="font-bold text-slate-900">{campaignSummary.activeCampaigns}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Campaigns At Risk</span>
          <span className="font-bold text-rose-700">{campaignSummary.atRiskCampaigns}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Budget Utilisation</span>
          <span className="font-bold text-slate-900">{campaignSummary.budgetUtilisation}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Attribution Coverage</span>
          <span className="font-bold text-emerald-600">{campaignSummary.attributionCoverage}</span>
        </div>
      </div>

      {/* Channel Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Channel Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Top Channel</span>
          <span className="font-bold text-slate-900">{channelSummary.topChannel}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Top ROAS Channel</span>
          <span className="font-bold text-emerald-600">{channelSummary.topRoasChannel}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Underperforming</span>
          <span className="font-bold text-amber-600">{channelSummary.underperformingChannel}</span>
        </div>
      </div>

      {/* Acquisition Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Acquisition Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">CAC</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{acquisitionSummary.cac}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowDown size={9} /> {acquisitionSummary.cacDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">30-Day Repeat</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{acquisitionSummary.repeat30}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {acquisitionSummary.repeatDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Avg Predicted CLV</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{acquisitionSummary.avgClv}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {acquisitionSummary.clvDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Attribution Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Attribution Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Model</span>
          <span className="font-bold text-slate-900">{attributionSummary.model}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Coverage</span>
          <span className="font-bold text-emerald-600">{attributionSummary.coverage}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Unattributed Revenue</span>
          <span className="font-bold text-slate-900">{attributionSummary.unattributedRevenue}</span>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Risk Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Spend Risk</span>
          <span className="font-bold text-rose-700">{riskSummary.spendRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">ROAS Risk</span>
          <span className="font-bold text-amber-600">{riskSummary.roasRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Attribution Warning</span>
          <span className="font-bold text-amber-600">{riskSummary.attributionWarning}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Funnel Leakage</span>
          <span className="font-bold text-rose-700">{riskSummary.funnelLeakage}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cohort Warning</span>
          <span className="font-bold text-slate-900">{riskSummary.cohortWarning}</span>
        </div>
      </div>

      {/* Quick Queues */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[11px]">
          {quickQueues.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5">
              <span className="text-slate-600 font-medium truncate max-w-[140px]">{q.queueName}</span>
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
