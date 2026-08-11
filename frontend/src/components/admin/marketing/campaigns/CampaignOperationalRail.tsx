"use client";

import React from "react";
import Link from "next/link";
import { CampaignOperationalRailData } from "@/data/campaignManagement.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import {
  AlertTriangle,
  Layers,
  FileCheck,
  ShieldCheck,
  History,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

export function CampaignOperationalRail({
  railData,
}: {
  railData: CampaignOperationalRailData;
}) {
  const {
    healthScore,
    healthMetrics,
    priorityAlerts,
    campaignSummary,
    approvalSummary,
    budgetSummary,
    deliverySummary,
    quickQueues,
  } = railData;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 font-sans">
      {/* 1. CAMPAIGN OPERATIONS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
          <h3 className="text-xs font-bold text-gray-900">
            Campaign Operations Health
          </h3>
          <Link
            href="/admin/marketing/governance"
            className="text-[11px] font-semibold text-[#800020] hover:underline"
          >
            View details
          </Link>
        </div>

        {/* Circular Donut Ring */}
        <div className="flex items-center justify-center my-1.5">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray={`${healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-gray-900 leading-none">
                {healthScore}
              </span>
              <span className="text-[9px] font-semibold text-gray-400">/100</span>
            </div>
          </div>
        </div>

        {/* Health Metrics Breakdown */}
        <div className="space-y-1 text-[11px] font-medium pt-2 border-t border-gray-100">
          {healthMetrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between text-gray-700">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">{m.label}</span>
              </div>
              <span className="font-bold text-gray-900">{m.score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. PRIORITY CAMPAIGN ALERTS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
            <span>Priority Campaign Alerts</span>
            <span className="text-gray-400">({priorityAlerts.total})</span>
          </h3>
          <Link
            href="/admin/marketing/governance"
            className="text-[11px] font-semibold text-[#800020] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="space-y-1.5 text-[11px]">
          {priorityAlerts.items.map((alt, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50/70 hover:bg-gray-100/70 transition-colors"
            >
              <MarketingStatusChip status={alt.severity} />
              <span className="font-semibold text-gray-800 truncate text-[10px]">
                {alt.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CAMPAIGN SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Campaign Summary
          </span>
          <div className="flex items-baseline gap-3 mt-0.5">
            <div>
              <span className="text-xs text-gray-400 font-medium">Total: </span>
              <span className="text-base font-bold text-gray-900">{campaignSummary.total}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium">Active: </span>
              <span className="text-base font-bold text-emerald-700">{campaignSummary.active}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium">Sched: </span>
              <span className="text-base font-bold text-blue-700">{campaignSummary.scheduled}</span>
            </div>
          </div>
        </div>
        <Link href="/admin/marketing/campaigns" className="text-xs font-bold text-[#800020] hover:underline">
          View
        </Link>
      </div>

      {/* 4. APPROVAL SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Approval Summary
          </span>
          <div className="flex items-baseline gap-3 mt-0.5">
            <div>
              <span className="text-xs text-gray-400 font-medium">Pending: </span>
              <span className="text-base font-bold text-amber-700">{approvalSummary.pending}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium">Overdue: </span>
              <span className="text-base font-bold text-rose-700">{approvalSummary.overdue}</span>
            </div>
          </div>
        </div>
        <Link href="/admin/marketing/governance" className="text-xs font-bold text-[#800020] hover:underline">
          View
        </Link>
      </div>

      {/* 5. BUDGET SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Budget Summary
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-sm font-bold text-[#800020]">{budgetSummary.spend}</span>
            <span className="text-[10px] text-gray-500 font-medium">
              Rem: {budgetSummary.remaining}
            </span>
          </div>
        </div>
        <Link href="/admin/marketing/budgets" className="text-xs font-bold text-[#800020] hover:underline">
          View
        </Link>
      </div>

      {/* 6. DELIVERY SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Delivery Summary
          </span>
          <div className="flex items-baseline gap-3 mt-0.5">
            <div>
              <span className="text-xs text-gray-400 font-medium">Healthy: </span>
              <span className="text-base font-bold text-emerald-700">{deliverySummary.healthyPercent}%</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium">Warnings: </span>
              <span className="text-base font-bold text-amber-700">{deliverySummary.warnings}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium">Blocked: </span>
              <span className="text-base font-bold text-rose-700">{deliverySummary.blocked}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. QUICK QUEUES */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">
          Quick Queues
        </h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div className="p-1 bg-gray-50 rounded border border-gray-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">{quickQueues.approvals}</span>
            <span className="text-gray-400 text-[8.5px]">Approvals</span>
          </div>
          <div className="p-1 bg-gray-50 rounded border border-gray-100">
            <Layers className="w-3.5 h-3.5 text-gray-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">{quickQueues.drafts}</span>
            <span className="text-gray-400 text-[8.5px]">Drafts</span>
          </div>
          <div className="p-1 bg-gray-50 rounded border border-gray-100">
            <FileCheck className="w-3.5 h-3.5 text-gray-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">{quickQueues.exceptions}</span>
            <span className="text-gray-400 text-[8.5px]">Exceptions</span>
          </div>
          <div className="p-1 bg-gray-50 rounded border border-gray-100">
            <DollarSign className="w-3.5 h-3.5 text-amber-600 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">{quickQueues.budgetRisk}</span>
            <span className="text-gray-400 text-[8.5px]">Budget Risk</span>
          </div>
          <div className="p-1 bg-gray-50 rounded border border-gray-100">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">{quickQueues.deliveryWarnings}</span>
            <span className="text-gray-400 text-[8.5px]">Warnings</span>
          </div>
        </div>
      </div>

      {/* 8. FINAL CAMPAIGN ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-1.5">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">
          Final Campaign Actions
        </h4>

        <Link
          href="/admin/marketing/governance"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#800020] bg-white hover:bg-rose-50 border border-[#800020]/40 rounded-lg shadow-2xs transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-[#800020]" />
          <span>Review Approval Queue</span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
          <span>Review Critical Campaigns</span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
        >
          <FileCheck className="w-3.5 h-3.5 text-gray-500" />
          <span>Open Campaign Exceptions</span>
        </Link>

        <Link
          href="/admin/marketing/budgets"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
        >
          <DollarSign className="w-3.5 h-3.5 text-gray-500" />
          <span>Open Budget Control</span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
          <span>Open Governance Queue</span>
        </Link>

        <Link
          href="/admin/marketing/reports-audit"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
        >
          <History className="w-3.5 h-3.5 text-gray-500" />
          <span>View Audit Trail</span>
        </Link>
      </div>
    </aside>
  );
}
