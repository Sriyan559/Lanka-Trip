"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { BudgetSpendData } from "@/data/campaignDetail.mock";

export function CampaignBudgetSpendPanel({
  budget,
}: {
  budget: BudgetSpendData;
}) {
  return (
    <MarketingSectionCard
      title="Budget & Spend"
      footerLink={{
        label: "Open Budget Details",
        href: "/admin/marketing/budgets",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-3 font-sans">
        {/* Metric Overview */}
        <div className="grid grid-cols-4 gap-2 text-center bg-gray-50/80 p-2 rounded-lg border border-gray-100 text-xs">
          <div>
            <span className="text-gray-400 block text-[9px]">Allocated</span>
            <span className="font-bold text-gray-900 text-xs">{budget.allocatedBudget}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Committed</span>
            <span className="font-bold text-gray-900 text-xs">{budget.committed}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Actual Spend</span>
            <span className="font-bold text-emerald-700 text-xs">{budget.actualSpend}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Remaining</span>
            <span className="font-bold text-amber-600 text-xs">{budget.remaining}</span>
          </div>
        </div>

        {/* Utilization Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-gray-500 font-medium">Budget Utilization</span>
            <span className="font-bold text-gray-900">{budget.utilizationPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#800020] h-full rounded-full transition-all"
              style={{ width: `${budget.utilizationPercent}%` }}
            />
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
            Actual Media Spend + Committed Costs
          </span>
          {budget.breakdown.map((item) => (
            <div key={item.category} className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-gray-900 font-semibold truncate w-24">{item.category}</span>
                <span className="text-[9px] text-gray-400 uppercase font-mono">{item.type}</span>
              </div>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-gray-900 font-bold text-[11px]">{item.amount}</span>
                <span className="text-gray-500 text-[10px] w-8 text-right">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}
