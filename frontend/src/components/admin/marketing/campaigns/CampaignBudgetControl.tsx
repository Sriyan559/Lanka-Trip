"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { BudgetUtilizationRecord } from "@/data/campaignManagement.mock";

interface CampaignBudgetControlProps {
  allocatedBudget: string;
  committed: string;
  committedPercent: number;
  actualSpend: string;
  actualSpendPercent: number;
  atRisk: string;
  atRiskPercent: number;
  utilization: BudgetUtilizationRecord[];
}

export function CampaignBudgetControl({
  allocatedBudget,
  committed,
  committedPercent,
  actualSpend,
  actualSpendPercent,
  atRisk,
  atRiskPercent,
  utilization = [],
}: CampaignBudgetControlProps) {
  return (
    <MarketingSectionCard
      title="Campaign Budget Control"
      subtitle="Financial allocation, committed spend & utilization variance"
      footerLink={{
        label: "Open Budget Control",
        href: "/admin/marketing/budgets",
      }}
      className="h-full"
    >
      {/* Top 4 Metrics Grid */}
      <div className="grid grid-cols-4 gap-1 bg-gray-50/80 p-2 rounded-lg text-center border border-gray-100 mb-3">
        <div>
          <span className="block text-[9px] font-medium text-gray-500 uppercase leading-tight">
            Allocated Budget
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-gray-900">
            {allocatedBudget}
          </span>
        </div>
        <div>
          <span className="block text-[9px] font-medium text-gray-500 uppercase leading-tight">
            Committed
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-gray-800">
            {committed} ({committedPercent}%)
          </span>
        </div>
        <div>
          <span className="block text-[9px] font-medium text-gray-500 uppercase leading-tight">
            Actual Spend
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-[#800020]">
            {actualSpend} ({actualSpendPercent}%)
          </span>
        </div>
        <div>
          <span className="block text-[9px] font-medium text-gray-500 uppercase leading-tight">
            At Risk
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-amber-700">
            {atRisk} ({atRiskPercent}%)
          </span>
        </div>
      </div>

      {/* Utilization Bars */}
      <div className="space-y-2 text-[11px]">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          Top Campaign Utilization
        </h4>
        {utilization.map((u) => (
          <div key={u.campaignName} className="space-y-0.5">
            <div className="flex items-center justify-between text-gray-700 font-semibold text-[10px]">
              <span className="truncate">{u.campaignName}</span>
              <span className="text-[#800020] font-bold">{u.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#800020] h-full rounded-full transition-all"
                style={{ width: `${u.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
