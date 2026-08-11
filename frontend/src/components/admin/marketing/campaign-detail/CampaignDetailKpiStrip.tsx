"use client";

import React from "react";
import { CampaignKpiSummary } from "@/data/campaignDetail.mock";

export function CampaignDetailKpiStrip({
  kpis,
}: {
  kpis: CampaignKpiSummary;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs font-sans grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 divide-x divide-gray-100">
      {/* 1. ALLOCATED */}
      <div className="flex flex-col pl-1">
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">Allocated</span>
        <span className="text-base font-extrabold text-gray-900 mt-0.5">{kpis.allocatedBudget}</span>
      </div>

      {/* 2. COMMITTED */}
      <div className="flex flex-col pl-3">
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">Committed</span>
        <span className="text-base font-extrabold text-gray-900 mt-0.5">{kpis.committedBudget}</span>
        <span className="text-[10px] font-medium text-gray-500">{kpis.committedPercent}</span>
      </div>

      {/* 3. ACTUAL SPEND */}
      <div className="flex flex-col pl-3">
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">Actual Spend</span>
        <span className="text-base font-extrabold text-gray-900 mt-0.5">{kpis.actualSpend}</span>
        <span className="text-[10px] font-medium text-emerald-600 font-bold">{kpis.actualSpendPercent}</span>
      </div>

      {/* 4. REMAINING */}
      <div className="flex flex-col pl-3">
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">Remaining</span>
        <span className="text-base font-extrabold text-gray-900 mt-0.5">{kpis.remainingBudget}</span>
        <span className="text-[10px] font-medium text-amber-600 font-bold">{kpis.remainingPercent}</span>
      </div>

      {/* 5. ROAS */}
      <div className="flex flex-col pl-3">
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">ROAS</span>
        <span className="text-base font-extrabold text-emerald-700 mt-0.5">{kpis.roas}</span>
        <span className="text-[10px] font-medium text-gray-500">{kpis.roasTarget}</span>
      </div>

      {/* 6. CONVERSION RATE */}
      <div className="flex flex-col pl-3">
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">Conversion Rate</span>
        <span className="text-base font-extrabold text-emerald-700 mt-0.5">{kpis.conversionRate}</span>
        <span className="text-[10px] font-medium text-gray-500">{kpis.conversionRateTarget}</span>
      </div>

      {/* 7. IMPRESSIONS / REACH */}
      <div className="flex flex-col pl-3">
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">Impressions / Reach</span>
        <span className="text-base font-extrabold text-gray-900 mt-0.5">{kpis.reach}</span>
        <span className="text-[10px] font-medium text-gray-500">{kpis.reachEligible}</span>
      </div>

      {/* 8. ACTIVE EXCEPTIONS */}
      <div className="flex flex-col pl-3">
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">Active Exceptions</span>
        <span className="text-base font-extrabold text-rose-700 mt-0.5">{kpis.activeExceptions}</span>
        <span className="text-[10px] font-medium text-gray-500">{kpis.criticalBlockers} critical blockers</span>
      </div>
    </div>
  );
}
