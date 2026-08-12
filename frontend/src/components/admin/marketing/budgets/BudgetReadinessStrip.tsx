"use client";

import React from "react";
import { BudgetReadinessCounters } from "@/data/marketingBudgets.mock";
import { RefreshCw, Save } from "lucide-react";

interface BudgetReadinessStripProps {
  counters: BudgetReadinessCounters;
  onClearAll: () => void;
  onRefresh: () => void;
  onApplyFilters: () => void;
}

export function BudgetReadinessStrip({
  counters,
  onClearAll,
  onRefresh,
  onApplyFilters,
}: BudgetReadinessStripProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left Badges Group */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold text-gray-800 text-xs mr-1">Budget Readiness & Health:</span>

        {/* Healthy */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs">
          Healthy <span className="font-bold text-emerald-700">{counters.healthy}</span>
        </span>

        {/* Needs Attention */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
          Needs Attention <span className="font-bold text-amber-700">{counters.needsAttention}</span>
        </span>

        {/* Overspend Risk */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-xs">
          Overspend Risk <span className="font-bold text-rose-700">{counters.overspendRisk}</span>
        </span>

        {/* Underspend Risk */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-semibold text-xs">
          Underspend Risk <span className="font-bold text-purple-700">{counters.underspendRisk}</span>
        </span>

        {/* Approval Pending */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-semibold text-xs">
          Approval Pending <span className="font-bold text-blue-700">{counters.approvalPending}</span>
        </span>

        {/* Reallocation Pending */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-50 text-orange-800 border border-orange-200 font-semibold text-xs">
          Reallocation Pending <span className="font-bold text-orange-700">{counters.reallocationPending}</span>
        </span>

        {/* Commitment Warning */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
          Commitment Warning <span className="font-bold text-amber-700">{counters.commitmentWarning}</span>
        </span>

        {/* Forecast Variance */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-semibold text-xs">
          Forecast Variance <span className="font-bold text-purple-700">{counters.forecastVariance}</span>
        </span>
      </div>

      {/* Right Controls Group */}
      <div className="flex flex-wrap items-center gap-2">
        <select className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-700 font-semibold focus:outline-none">
          <option>Default Budget View</option>
          <option>High Spend Watch</option>
          <option>Approval Watch</option>
          <option>Forecast Variance Watch</option>
        </select>

        <button
          onClick={onClearAll}
          className="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          Clear All
        </button>

        <button
          onClick={() => {}}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <Save className="w-3 h-3 text-gray-500" />
          <span>Save View</span>
        </button>

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3 text-gray-500" />
          <span>Refresh</span>
        </button>

        <button
          onClick={onApplyFilters}
          className="px-3 py-1 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
