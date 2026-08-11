"use client";

import React from "react";
import Link from "next/link";
import { BudgetRailData } from "@/data/marketingBudgets.mock";
import {
  Plus,
  AlertTriangle,
  AlertOctagon,
  FileText,
  DollarSign,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

interface BudgetOperationsRailProps {
  railData: BudgetRailData;
  onCreateBudget?: () => void;
}

export function BudgetOperationsRail({
  railData,
  onCreateBudget,
}: BudgetOperationsRailProps) {
  const {
    healthScore,
    healthLabel,
    healthDimensions,
    budgetSummary,
    forecastSummary,
    allocationSummary,
    approvalSummary,
    exceptionsSummary,
    quickQueues,
  } = railData;

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 text-xs text-gray-700 font-sans">
      {/* 1. BUDGET OPERATIONS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Budget Operations Health</h3>

        {/* Radial Score Gauge */}
        <div className="flex flex-col items-center justify-center my-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-gray-100"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-emerald-600 transition-all duration-500 ease-out"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-gray-900 leading-none">
                {healthScore}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">/100</span>
            </div>
          </div>
          <span className="mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {healthLabel}
          </span>
        </div>

        {/* Health Dimensions Breakdown */}
        <div className="mt-3 space-y-1 text-[11px] border-t border-gray-100 pt-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Allocation Integrity</span>
            <span className="font-bold text-gray-900">{healthDimensions.allocationIntegrity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Spend Control</span>
            <span className="font-bold text-gray-900">{healthDimensions.spendControl}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Commitment Coverage</span>
            <span className="font-bold text-gray-900">{healthDimensions.commitmentCoverage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Forecast Accuracy</span>
            <span className="font-bold text-gray-900">{healthDimensions.forecastAccuracy}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Approval Efficiency</span>
            <span className="font-bold text-gray-900">{healthDimensions.approvalEfficiency}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Reallocation Governance</span>
            <span className="font-bold text-gray-900">{healthDimensions.reallocationGovernance}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Finance Sync</span>
            <span className="font-bold text-gray-900">{healthDimensions.financeSync}%</span>
          </div>
        </div>

        <div className="mt-2 text-center">
          <button className="text-[11px] font-bold text-[#800020] hover:underline cursor-pointer">
            View Full Health
          </button>
        </div>
      </div>

      {/* 2. BUDGET SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Budget Summary
        </h3>
        <div className="grid grid-cols-4 gap-1 text-center text-[11px]">
          <div>
            <span className="text-gray-400 text-[10px] block">Approved</span>
            <span className="font-bold text-gray-900">{budgetSummary.approved}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[10px] block">Committed</span>
            <span className="font-bold text-emerald-700">{budgetSummary.committed}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[10px] block">Actual</span>
            <span className="font-bold text-blue-700">{budgetSummary.actual}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[10px] block">Unspent</span>
            <span className="font-bold text-orange-700">{budgetSummary.unspent}</span>
          </div>
        </div>
      </div>

      {/* 3. FORECAST SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Forecast Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Forecast</span>
          <span className="font-bold text-gray-900">{forecastSummary.forecast}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Forecast Utilization</span>
          <span className="font-bold text-gray-900">{forecastSummary.utilizationPercent}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Conservative Variance</span>
          <span className="font-bold text-emerald-700">{forecastSummary.conservativeVariancePercent}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Over / Under vs Budget</span>
          <span className="font-bold text-emerald-700">{forecastSummary.overUnderBudget}</span>
        </div>
      </div>

      {/* 4. ALLOCATION SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Allocation Summary
        </h3>
        {allocationSummary.map((item) => (
          <div key={item.name} className="space-y-0.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-700 font-medium">{item.name}</span>
              <span className="font-mono font-bold text-gray-900">{item.percent}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${item.percent}%`, backgroundColor: item.barColor }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 5. APPROVAL SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Approval Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Pending</span>
          <span className="font-bold text-amber-700">{approvalSummary.pending}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Overdue</span>
          <span className="font-bold text-rose-700">{approvalSummary.overdue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Reallocations</span>
          <span className="font-bold text-blue-700">{approvalSummary.reallocations}</span>
        </div>
      </div>

      {/* 6. EXCEPTIONS SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Exceptions Summary
        </h3>
        <div className="flex justify-between font-bold text-gray-900">
          <span>Open</span>
          <span className="text-rose-600">{exceptionsSummary.open}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">High</span>
          <span className="font-bold text-rose-600">{exceptionsSummary.high}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warnings</span>
          <span className="font-bold text-amber-700">{exceptionsSummary.warnings}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Information</span>
          <span className="text-gray-600">{exceptionsSummary.information}</span>
        </div>
      </div>

      {/* 7. QUICK QUEUES */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Quick Queues
        </h3>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Overspend Risk</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.overspendRisk}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Underspend Risk</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-bold text-[10px]">
            {quickQueues.underspendRisk}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Approval Pending</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.approvalPending}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-rose-600" />
            <span>Reallocation Pending</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.reallocationPending}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Commitment Warnings</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px]">
            {quickQueues.commitmentWarnings}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
            <span>Forecast Variance</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-[#800020] text-white font-bold text-[10px]">
            {quickQueues.forecastVariance}
          </span>
        </Link>
      </div>

      {/* 8. FINAL BUDGET ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Final Budget Actions
        </h3>

        <button
          onClick={onCreateBudget}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-bold transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Budget</span>
        </button>

        <Link
          href="/admin/marketing/governance"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Review Budget Exceptions</span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Review Approval Queue</span>
        </Link>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Create Reallocation</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Open Spend Control</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Review Forecast</span>
        </button>

        <Link
          href="/admin/marketing/reports-audit"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Audit Trail</span>
        </Link>
      </div>
    </aside>
  );
}
