"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { BudgetBreakdownItem } from "@/data/marketingCommandCenter.mock";

interface BudgetSpendProps {
  totalBudget: string;
  committed: string;
  actualSpend: string;
  remaining: string;
  utilizedPercent: number;
  breakdown: BudgetBreakdownItem[];
}

export function BudgetSpend({
  totalBudget,
  committed,
  actualSpend,
  remaining,
  utilizedPercent,
  breakdown = [],
}: BudgetSpendProps) {
  return (
    <MarketingSectionCard
      title="Budget & Spend"
      subtitle="Financial marketing allocations and channel utilization"
      footerLink={{
        label: "Open Budget Control",
        href: "/admin/marketing/budgets",
      }}
      className="h-full"
    >
      {/* Top Metrics Row */}
      <div className="grid grid-cols-4 gap-2 bg-gray-50/80 p-2 rounded-lg text-center border border-gray-100 mb-3">
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Total Budget
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-gray-900">
            {totalBudget}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Committed
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-gray-800">
            {committed}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Actual Spend
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-[#800020]">
            {actualSpend}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Remaining
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-emerald-700">
            {remaining}
          </span>
        </div>
      </div>

      {/* Main Utilization Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[11px] font-bold mb-1">
          <span className="text-gray-600">Budget Utilization</span>
          <span className="text-[#800020]">{utilizedPercent}% utilized</span>
        </div>
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-gray-200">
          <div
            className="h-full bg-[#800020] rounded-full transition-all duration-500"
            style={{ width: `${utilizedPercent}%` }}
          />
        </div>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-1.5 text-[11px]">
        {breakdown.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-gray-50/60"
          >
            <div className="flex items-center gap-1.5 font-medium text-gray-700 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-xs shrink-0 ${item.color}`} />
              <span className="truncate">{item.category}</span>
            </div>
            <div className="flex items-center gap-3 font-semibold shrink-0">
              <span className="text-gray-900">{item.amount}</span>
              <span className="text-gray-400 text-[10px] w-8 text-right">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
