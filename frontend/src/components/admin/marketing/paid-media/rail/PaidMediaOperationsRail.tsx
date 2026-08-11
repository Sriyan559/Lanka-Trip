"use client";

import React from "react";
import Link from "next/link";
import { PaidMediaRailData } from "@/data/marketingPaidMedia.mock";
import {
  Plus,
  AlertTriangle,
  AlertOctagon,
  Shield,
  FileText,
  DollarSign,
  Users,
  RefreshCw,
} from "lucide-react";

interface PaidMediaOperationsRailProps {
  railData: PaidMediaRailData;
  onCreateCampaign?: () => void;
}

export function PaidMediaOperationsRail({
  railData,
  onCreateCampaign,
}: PaidMediaOperationsRailProps) {
  const {
    healthScore,
    healthLabel,
    healthDimensions,
    campaignSummary,
    spendSummary,
    platformSummary,
    acquisitionSummary,
    performanceSummary,
    exceptionsSummary,
    quickQueues,
  } = railData;

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 text-xs text-gray-700 font-sans">
      {/* 1. PAID MEDIA OPERATIONS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Paid Media Operations Health</h3>

        {/* Radial Circular Score Gauge */}
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
            <span className="text-gray-500">Platform Connectivity</span>
            <span className="font-bold text-gray-900">{healthDimensions.platformConnectivity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Audience Activation</span>
            <span className="font-bold text-gray-900">{healthDimensions.audienceActivation}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Creative Readiness</span>
            <span className="font-bold text-gray-900">{healthDimensions.creativeReadiness}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Budget Pacing</span>
            <span className="font-bold text-gray-900">{healthDimensions.budgetPacing}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tracking Health</span>
            <span className="font-bold text-gray-900">{healthDimensions.trackingHealth}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Acquisition Efficiency</span>
            <span className="font-bold text-gray-900">{healthDimensions.acquisitionEfficiency}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Governance</span>
            <span className="font-bold text-gray-900">{healthDimensions.governance}%</span>
          </div>
        </div>

        <div className="mt-2 text-center">
          <button className="text-[11px] font-bold text-[#800020] hover:underline cursor-pointer">
            View Full Health
          </button>
        </div>
      </div>

      {/* 2. CAMPAIGN SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Campaign Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Total</span>
          <span className="font-bold text-gray-900">{campaignSummary.total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Active</span>
          <span className="font-bold text-emerald-700">{campaignSummary.active}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Scheduled</span>
          <span className="font-bold text-blue-700">{campaignSummary.scheduled}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Paused</span>
          <span className="font-bold text-amber-700">{campaignSummary.paused}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Limited</span>
          <span className="font-bold text-purple-700">{campaignSummary.limited}</span>
        </div>
      </div>

      {/* 3. SPEND SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Spend Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Budget</span>
          <span className="font-bold text-gray-900">{spendSummary.budget}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Spend</span>
          <span className="font-bold text-blue-700">{spendSummary.spend}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Remaining</span>
          <span className="font-bold text-emerald-700">{spendSummary.remaining}</span>
        </div>
        <div className="pt-1">
          <div className="flex justify-between text-[11px] font-semibold text-gray-600 mb-1">
            <span>Pacing</span>
            <span>{spendSummary.pacingPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${spendSummary.pacingPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. PLATFORM SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Platform Summary
        </h3>
        {platformSummary.map((plat) => (
          <div key={plat.name} className="space-y-0.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-700 font-medium">{plat.name}</span>
              <span className="font-mono font-bold text-gray-900">{plat.spend}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${plat.percent}%`, backgroundColor: plat.barColor }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 5. ACQUISITION SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Acquisition Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">New Customers</span>
          <span className="font-bold text-gray-900">{acquisitionSummary.newCustomers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Avg CAC</span>
          <span className="font-bold text-emerald-700">{acquisitionSummary.avgCac}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Conversions</span>
          <span className="font-bold text-gray-900">{acquisitionSummary.conversions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Avg Conv Rate</span>
          <span className="font-bold text-blue-700">{acquisitionSummary.avgConvRate}</span>
        </div>
      </div>

      {/* 6. PERFORMANCE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Performance Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Impressions</span>
          <span className="font-bold text-gray-900">{performanceSummary.impressions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Clicks</span>
          <span className="font-bold text-blue-700">{performanceSummary.clicks}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">CTR</span>
          <span className="font-bold text-gray-900">{performanceSummary.ctr}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">ROAS Reference</span>
          <span className="font-bold text-emerald-700">{performanceSummary.roasReference}</span>
        </div>
      </div>

      {/* 7. EXCEPTIONS SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Exceptions Summary
        </h3>
        <div className="flex justify-between font-bold text-gray-900">
          <span>Open</span>
          <span className="text-rose-600">{exceptionsSummary.open}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Critical</span>
          <span className="font-bold text-rose-600">{exceptionsSummary.critical}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">High</span>
          <span className="font-bold text-rose-600">{exceptionsSummary.high}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warning</span>
          <span className="font-bold text-amber-700">{exceptionsSummary.warning}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Informational</span>
          <span className="text-gray-600">{exceptionsSummary.informational}</span>
        </div>
      </div>

      {/* 8. QUICK QUEUES */}
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
            <span>Budget Risk</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.budgetRisk}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Delivery Warnings</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.deliveryWarnings}
          </span>
        </Link>

        <Link
          href="/admin/marketing/content"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Creative Issues</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.creativeIssues}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Tracking Warnings</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.trackingWarnings}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-rose-600" />
            <span>Policy Issues</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.policyIssues}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-rose-600" />
            <span>Sync Failures</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.syncFailures}
          </span>
        </Link>
      </div>

      {/* 9. FINAL PAID MEDIA ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Final Paid Media Actions
        </h3>

        <button
          onClick={onCreateCampaign}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-bold transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Paid Media Campaign</span>
        </button>

        <Link
          href="/admin/marketing/governance"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Review Advertising Exceptions</span>
        </Link>

        <Link
          href="/admin/marketing/budgets"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Open Budget Control</span>
        </Link>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Review Tracking Health</span>
        </button>

        <Link
          href="/admin/marketing/audiences"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Review Audience Activation</span>
        </Link>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Open Platform Reconciliation</span>
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
