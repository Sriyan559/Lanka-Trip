"use client";

import React from "react";
import Link from "next/link";
import { DetailRightRailData } from "@/data/campaignDetail.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import {
  Edit,
  PlusCircle,
  Copy,
  ShieldCheck,
  DollarSign,
  History,
  Users,
  PieChart,
  FileText,
  AlertTriangle,
} from "lucide-react";

export function CampaignDetailRightRail({
  railData,
  campaignId,
}: {
  railData: DetailRightRailData;
  campaignId: string;
}) {
  const {
    healthScore,
    metrics,
    status,
    keyPerformance,
    budgetSummary,
    audienceSummary,
    exceptions,
  } = railData;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 font-sans">
      {/* 1. CAMPAIGN HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
          <h3 className="text-xs font-bold text-gray-900">Campaign Health</h3>
          <span className="text-[10px] text-gray-400 font-medium">View details</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Health Donut Circle */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray={`${healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-gray-900 leading-none">
                {healthScore}
              </span>
              <span className="text-[8px] font-bold text-gray-400">/100</span>
            </div>
          </div>

          {/* Metric list */}
          <div className="flex-1 min-w-0 space-y-1 text-[10px]">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {m.label}
                </span>
                <span className="font-bold text-gray-900 font-mono">{m.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. CAMPAIGN STATUS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Campaign Status
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-gray-400 block text-[9px]">Lifecycle</span>
            <MarketingStatusChip status={status.active ? "Active" : "Paused"} className="text-[8px] px-1.5 py-0.2 mt-0.5" />
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Approval</span>
            <MarketingStatusChip status={status.approval} className="text-[8px] px-1.5 py-0.2 mt-0.5" />
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Governance</span>
            <MarketingStatusChip status={status.governance} className="text-[8px] px-1.5 py-0.2 mt-0.5" />
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Delivery</span>
            <MarketingStatusChip status={status.delivery} className="text-[8px] px-1.5 py-0.2 mt-0.5" />
          </div>
        </div>
      </div>

      {/* 3. KEY PERFORMANCE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Key Performance Summary
        </h3>

        <div className="grid grid-cols-3 gap-1 text-center font-sans">
          <div>
            <span className="text-gray-400 block text-[9px]">Revenue</span>
            <span className="font-bold text-gray-900 text-xs">{keyPerformance.revenue}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">ROAS</span>
            <span className="font-bold text-emerald-700 text-xs">{keyPerformance.roas}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Conversion</span>
            <span className="font-bold text-gray-900 text-xs">{keyPerformance.conversion}</span>
          </div>
        </div>
      </div>

      {/* 4. BUDGET SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Budget Summary
        </h3>

        <div className="grid grid-cols-3 gap-1 text-center font-sans">
          <div>
            <span className="text-gray-400 block text-[9px]">Spend</span>
            <span className="font-bold text-gray-900 text-xs">{budgetSummary.spend}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Committed</span>
            <span className="font-bold text-gray-900 text-xs">{budgetSummary.committed}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Remaining</span>
            <span className="font-bold text-amber-600 text-xs">{budgetSummary.remaining}</span>
          </div>
        </div>
      </div>

      {/* 5. AUDIENCE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Audience Summary
        </h3>

        <div className="grid grid-cols-3 gap-1 text-center font-sans">
          <div>
            <span className="text-gray-400 block text-[9px]">Reach</span>
            <span className="font-bold text-gray-900 text-xs">{audienceSummary.reach}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Engagement</span>
            <span className="font-bold text-gray-900 text-xs">{audienceSummary.engagement}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Conversions</span>
            <span className="font-bold text-emerald-700 text-xs">{audienceSummary.conversions}</span>
          </div>
        </div>
      </div>

      {/* 6. EXCEPTIONS SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Exceptions
        </h3>

        <div className="grid grid-cols-3 gap-1 text-center font-sans text-xs">
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-[9px] block">Critical</span>
            <span className="font-bold text-gray-400">{exceptions.critical}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-[9px] block">High</span>
            <span className="font-bold text-gray-400">{exceptions.high}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-[9px] block">Medium</span>
            <span className="font-bold text-amber-600">{exceptions.medium}</span>
          </div>
        </div>
      </div>

      {/* 7. QUICK LINKS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Quick Links
        </h3>

        <div className="grid grid-cols-4 gap-1.5 text-center">
          <Link
            href="/admin/marketing/audiences"
            className="flex flex-col items-center p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <Users className="w-4 h-4 text-gray-600 mb-0.5" />
            <span className="text-[9px] font-bold text-gray-700">Audience</span>
          </Link>
          <Link
            href="/admin/marketing/budgets"
            className="flex flex-col items-center p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <DollarSign className="w-4 h-4 text-gray-600 mb-0.5" />
            <span className="text-[9px] font-bold text-gray-700">Budget</span>
          </Link>
          <Link
            href="/admin/marketing/content"
            className="flex flex-col items-center p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4 text-gray-600 mb-0.5" />
            <span className="text-[9px] font-bold text-gray-700">Content</span>
          </Link>
          <Link
            href="/admin/marketing/reports-audit"
            className="flex flex-col items-center p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <PieChart className="w-4 h-4 text-gray-600 mb-0.5" />
            <span className="text-[9px] font-bold text-gray-700">Reports</span>
          </Link>
        </div>
      </div>

      {/* 8. FAST CAMPAIGN ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Fast Campaign Actions
        </h3>

        <div className="flex flex-col gap-1.5">
          <Link
            href={`/admin/marketing/campaigns/${campaignId}/edit`}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Campaign</span>
          </Link>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Budget / Update</span>
          </button>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <Copy className="w-3.5 h-3.5" />
            <span>Duplicate Campaign</span>
          </button>

          <Link
            href="/admin/marketing/governance"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open Governance</span>
          </Link>

          <Link
            href="/admin/marketing/budgets"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Open Budget Control</span>
          </Link>

          <Link
            href="/admin/marketing/reports-audit"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            <span>View Audit Trail</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
