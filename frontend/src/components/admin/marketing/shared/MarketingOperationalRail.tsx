"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Sparkles,
  Layers,
  FileCheck,
  BarChart2,
  ShieldCheck,
  History,
  CheckCircle2,
} from "lucide-react";
import { MarketingStatusChip } from "./MarketingStatusChip";

interface MarketingOperationalRailProps {
  railData: {
    healthScore: number;
    healthMetrics: Array<{ label: string; score: number }>;
    priorityAlerts: Array<{ id: string; severity: any; description: string }>;
    campaignSummary: { active: number; change: string; scheduledNext: number };
    audienceSummary: { reach: string; change: string; suppressed: string };
    spendSummary: { actualSpend: string; utilizedPercent: number; remaining: string };
    attributionSummary: { attributedRevenue: string; change: string; roas: string };
    quickOverview: {
      approvals: number;
      campaigns: number;
      contentReviews: number;
      exceptions: number;
      alerts: number;
    };
  };
}

export function MarketingOperationalRail({ railData }: MarketingOperationalRailProps) {
  const {
    healthScore,
    healthMetrics,
    priorityAlerts,
    campaignSummary,
    audienceSummary,
    spendSummary,
    attributionSummary,
    quickOverview,
  } = railData;

  return (
    <aside className="w-full xl:w-[290px] shrink-0 flex flex-col gap-3 font-sans">
      {/* 1. MARKETING OPERATIONS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
          <h3 className="text-xs font-bold text-gray-900">
            Marketing Operations Health
          </h3>
          <Link
            href="/admin/marketing/governance"
            className="text-[11px] font-semibold text-[#800020] hover:underline"
          >
            View details
          </Link>
        </div>

        {/* Circular / Radial Score Ring */}
        <div className="flex items-center justify-center my-2">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* SVG Donut */}
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

        {/* Score Breakdown List */}
        <div className="space-y-1.5 text-[11px] font-medium pt-2 border-t border-gray-100">
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

      {/* 2. PRIORITY MARKETING ALERTS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
            <span>Priority Marketing Alerts</span>
            <span className="text-gray-400">({priorityAlerts.length})</span>
          </h3>
          <Link
            href="/admin/marketing/governance"
            className="text-[11px] font-semibold text-[#800020] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="space-y-1.5 text-[11px]">
          {priorityAlerts.map((alt) => (
            <div
              key={alt.id}
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
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Campaign Summary
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-lg font-bold text-gray-900">
              {campaignSummary.active} Active
            </span>
            <span className="text-[10px] font-semibold text-emerald-600">
              {campaignSummary.change}
            </span>
          </div>
          <span className="text-[10px] text-gray-500">
            {campaignSummary.scheduledNext} scheduled next
          </span>
        </div>
        <Link
          href="/admin/marketing/campaigns"
          className="text-xs font-bold text-[#800020] hover:underline"
        >
          View
        </Link>
      </div>

      {/* 4. AUDIENCE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Audience Summary
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-lg font-bold text-gray-900">
              {audienceSummary.reach} Reach
            </span>
            <span className="text-[10px] font-semibold text-emerald-600">
              {audienceSummary.change}
            </span>
          </div>
          <span className="text-[10px] text-gray-500">
            {audienceSummary.suppressed} suppressed
          </span>
        </div>
        <Link
          href="/admin/marketing/audiences"
          className="text-xs font-bold text-[#800020] hover:underline"
        >
          View
        </Link>
      </div>

      {/* 5. SPEND SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Spend Summary
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-base font-bold text-[#800020]">
              {spendSummary.actualSpend}
            </span>
            <span className="text-[10px] font-semibold text-gray-600">
              {spendSummary.utilizedPercent}% of budget
            </span>
          </div>
          <span className="text-[10px] text-gray-500">
            Remaining: {spendSummary.remaining}
          </span>
        </div>
        <Link
          href="/admin/marketing/budgets"
          className="text-xs font-bold text-[#800020] hover:underline"
        >
          View
        </Link>
      </div>

      {/* 6. ATTRIBUTION SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Attribution Summary
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-base font-bold text-gray-900">
              {attributionSummary.attributedRevenue}
            </span>
            <span className="text-[10px] font-semibold text-emerald-600">
              {attributionSummary.change}
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-semibold">
            ROAS {attributionSummary.roas}
          </span>
        </div>
        <Link
          href="/admin/marketing/attribution-analytics"
          className="text-xs font-bold text-[#800020] hover:underline"
        >
          View
        </Link>
      </div>

      {/* 7. QUICK OVERVIEW */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">
          Quick Overview
        </h4>
        <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
          <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">
              {quickOverview.approvals}
            </span>
            <span className="text-gray-400 text-[9px]">Approvals</span>
          </div>
          <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <Layers className="w-3.5 h-3.5 text-gray-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">
              {quickOverview.campaigns}
            </span>
            <span className="text-gray-400 text-[9px]">Campaigns</span>
          </div>
          <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <FileCheck className="w-3.5 h-3.5 text-gray-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">
              {quickOverview.contentReviews}
            </span>
            <span className="text-gray-400 text-[9px]">Content</span>
          </div>
          <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">
              {quickOverview.exceptions}
            </span>
            <span className="text-gray-400 text-[9px]">Exceptions</span>
          </div>
          <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <BarChart2 className="w-3.5 h-3.5 text-rose-500 mx-auto mb-0.5" />
            <span className="block font-bold text-gray-900">
              {quickOverview.alerts}
            </span>
            <span className="text-gray-400 text-[9px]">Alerts</span>
          </div>
        </div>
      </div>

      {/* 8. FINAL MARKETING ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-1.5">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">
          Final Marketing Actions
        </h4>

        <Link
          href="/admin/marketing/governance"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#800020] bg-white hover:bg-rose-50/80 border border-[#800020]/40 rounded-lg shadow-2xs transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-[#800020]" />
          <span>Review Critical Alert</span>
        </Link>

        <Link
          href="/admin/marketing/campaigns"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-gray-500" />
          <span>Open Campaign Queue</span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
          <span>Open Governance Queue</span>
        </Link>

        <Link
          href="/admin/marketing/attribution-analytics"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
        >
          <BarChart2 className="w-3.5 h-3.5 text-gray-500" />
          <span>View Attribution Dashboard</span>
        </Link>

        <button
          onClick={() => alert("Launching Marketing AI Engine...")}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-white hover:bg-purple-50 border border-purple-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Launch Marketing AI</span>
        </button>

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
