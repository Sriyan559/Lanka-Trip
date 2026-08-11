"use client";

import React from "react";
import Link from "next/link";
import { SelectedBudgetDetails } from "@/data/marketingBudgets.mock";
import { ExternalLink } from "lucide-react";

import { BudgetAllocationByChannel } from "./BudgetAllocationByChannel";
import { ChannelAllocationVsBudget } from "./ChannelAllocationVsBudget";
import { CampaignBudgetAllocation } from "./CampaignBudgetAllocation";
import { CommitmentSummaryCard } from "./CommitmentSummaryCard";
import { ActualMarketingSpendCard } from "./ActualMarketingSpendCard";
import { SpendVsPlanChartCard } from "./SpendVsPlanChartCard";
import { MarketingSpendForecastCard } from "./MarketingSpendForecastCard";
import { BudgetVarianceCard } from "./BudgetVarianceCard";
import { BudgetReallocationsCard } from "./BudgetReallocationsCard";
import { ReallocationImpactCard } from "./ReallocationImpactCard";
import { ApprovalWorkflowCard } from "./ApprovalWorkflowCard";
import { BudgetControlsCard } from "./BudgetControlsCard";
import { ActiveBudgetActivityCard } from "./ActiveBudgetActivityCard";
import { ActiveBudgetExceptionsCard } from "./ActiveBudgetExceptionsCard";
import { PaidMediaSpendReferenceCard } from "./PaidMediaSpendReferenceCard";
import { CampaignBudgetUsageCard } from "./CampaignBudgetUsageCard";
import { FinanceReferenceCard } from "./FinanceReferenceCard";
import { BudgetVersionCard } from "./BudgetVersionCard";
import { RecentBudgetActivityCard } from "./RecentBudgetActivityCard";
import { AuditSummaryCard } from "./AuditSummaryCard";

interface SelectedBudgetWorkspaceProps {
  details: SelectedBudgetDetails | null;
}

export function SelectedBudgetWorkspace({ details }: SelectedBudgetWorkspaceProps) {
  if (!details) {
    return (
      <div className="bg-white border border-rose-200/80 rounded-xl p-8 text-center text-gray-500 shadow-2xs">
        <p className="text-sm font-semibold">
          Select a budget to view planning, allocation, commitment and spend details.
        </p>
      </div>
    );
  }

  const { budget, summaryMetrics } = details;

  return (
    <div className="bg-[#faf8f8] border border-rose-200/80 rounded-xl p-3 sm:p-4 shadow-2xs flex flex-col gap-3">
      {/* Header Strip */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            Selected Budget — <span className="text-[#800020]">{budget.budgetName}</span>
          </span>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Active
            </span>
            <span className="px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Approved
            </span>
            <span className="px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Healthy
            </span>
          </div>
        </div>

        {/* Open Budget Detail Link */}
        <Link
          href={`/admin/marketing/budgets/${budget.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] hover:text-[#66001a] hover:underline"
        >
          <span>Open Budget Detail</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 10 Summary Metrics Strip */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-3 text-xs text-gray-700">
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Approved Budget</span>
          <span className="font-bold text-gray-900">{summaryMetrics.approvedBudget}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Committed</span>
          <span className="font-bold text-emerald-700">{summaryMetrics.committed}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Actual Spend</span>
          <span className="font-bold text-blue-700">{summaryMetrics.actualSpend}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Remaining (Unspent)</span>
          <span className="font-bold text-orange-700">{summaryMetrics.remainingUnspent}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Available to Commit</span>
          <span className="font-bold text-emerald-800">{summaryMetrics.availableToCommit}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Utilization</span>
          <span className="font-bold text-gray-900">{summaryMetrics.utilizationPercent}%</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Commitment Coverage</span>
          <span className="font-bold text-gray-900">{summaryMetrics.commitmentCoveragePercent}%</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Forecast Final Spend</span>
          <span className="font-bold text-gray-900">{summaryMetrics.forecastFinalSpend}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Forecast Variance</span>
          <span className="font-bold text-emerald-700">{summaryMetrics.forecastVariancePercent}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Spend Health</span>
          <span className="font-bold text-emerald-800">{summaryMetrics.spendHealthScore} / 100</span>
        </div>
      </div>

      {/* Card Grid ROW 1: Allocations & Commitments (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        <BudgetAllocationByChannel allocations={details.channelAllocations} />
        <ChannelAllocationVsBudget items={details.channelVsBudget} />
        <CampaignBudgetAllocation campaigns={details.campaignAllocations} />
        <CommitmentSummaryCard commitment={details.commitmentSummary} />
      </div>

      {/* Card Grid ROW 2: Analytics & Forecasting (5 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
        <ActualMarketingSpendCard spend={details.actualSpendBreakdown} />
        <SpendVsPlanChartCard trendData={details.spendVsPlanTrend} />
        <MarketingSpendForecastCard forecast={details.forecast} />
        <BudgetVarianceCard varianceList={details.varianceList} />
        <BudgetReallocationsCard reallocations={details.reallocations} />
      </div>

      {/* Card Grid ROW 3: Operations, Controls & Exceptions (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-stretch">
        <ReallocationImpactCard impact={details.reallocationImpact} />
        <ApprovalWorkflowCard workflow={details.approvalWorkflow} />
        <BudgetControlsCard controls={details.controls} />
        <ActiveBudgetActivityCard activityList={details.activeActivity} />
        <ActiveBudgetExceptionsCard exceptions={details.activeExceptions} />
        <PaidMediaSpendReferenceCard paidMediaRef={details.paidMediaRef} />
      </div>

      {/* Card Grid ROW 4: Governance, Versions & Audit (5 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
        <CampaignBudgetUsageCard campaignUsage={details.campaignUsage} />
        <FinanceReferenceCard financeRef={details.financeReference} />
        <BudgetVersionCard versionInfo={details.version} />
        <RecentBudgetActivityCard activityLog={details.recentActivity} />
        <AuditSummaryCard audit={details.auditSummary} />
      </div>
    </div>
  );
}
