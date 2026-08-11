"use client";

import React from "react";
import Link from "next/link";
import { ExperienceRailData } from "@/data/marketingWebApp.mock";
import {
  Plus,
  AlertTriangle,
  AlertOctagon,
  Monitor,
  Smartphone,
  Shield,
  FileText,
  Layers,
} from "lucide-react";

interface ExperienceOperationsRailProps {
  railData: ExperienceRailData;
  onCreateCampaign?: () => void;
}

export function ExperienceOperationsRail({
  railData,
  onCreateCampaign,
}: ExperienceOperationsRailProps) {
  const {
    healthScore,
    healthLabel,
    placementSummary,
    surfaceSummary,
    performanceSummary,
    contentReadinessSummary,
    exceptionsSummary,
    quickQueues,
  } = railData;

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 text-xs text-gray-700 font-sans">
      {/* 1. EXPERIENCE OPERATIONS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Experience Operations Health</h3>

        {/* Radial Score Gauge */}
        <div className="flex flex-col items-center justify-center my-3">
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
          <span className="mt-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {healthLabel}
          </span>
        </div>
      </div>

      {/* 2. PLACEMENT SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Placement Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Total</span>
          <span className="font-bold text-gray-900">{placementSummary.total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Active</span>
          <span className="font-bold text-emerald-700">{placementSummary.active}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Scheduled</span>
          <span className="font-bold text-blue-700">{placementSummary.scheduled}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Draft</span>
          <span className="text-gray-600">{placementSummary.draft}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Paused</span>
          <span className="font-bold text-amber-700">{placementSummary.paused}</span>
        </div>
      </div>

      {/* 3. SURFACE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Surface Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Website</span>
          <span className="font-bold text-gray-900">{surfaceSummary.website}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Mobile Web</span>
          <span className="font-semibold text-gray-800">{surfaceSummary.mobileWeb}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">iOS</span>
          <span className="font-semibold text-gray-800">{surfaceSummary.ios}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Android</span>
          <span className="font-semibold text-gray-800">{surfaceSummary.android}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Landing Pages</span>
          <span className="font-semibold text-gray-800">{surfaceSummary.landingPages}</span>
        </div>
      </div>

      {/* 4. PERFORMANCE SUMMARY (LAST 30 DAYS) */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100 flex justify-between">
          <span>Performance Summary</span>
          <span className="text-[10px] text-gray-400 font-normal">(Last 30 Days)</span>
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Impressions</span>
          <span className="font-bold text-gray-900">{performanceSummary.impressions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Engagement Rate</span>
          <span className="font-bold text-blue-700">{performanceSummary.engagementRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Conversion Rate</span>
          <span className="font-bold text-emerald-700">{performanceSummary.conversionRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Revenue Reference</span>
          <span className="font-bold text-emerald-800">{performanceSummary.revenueReference}</span>
        </div>
      </div>

      {/* 5. CONTENT READINESS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Content Readiness
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Ready</span>
          <span className="font-bold text-emerald-700">{contentReadinessSummary.ready}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Pending</span>
          <span className="font-bold text-amber-700">{contentReadinessSummary.pending}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Missing Content</span>
          <span className="font-bold text-rose-600">{contentReadinessSummary.missingContent}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warning</span>
          <span className="font-bold text-orange-700">{contentReadinessSummary.warning}</span>
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
          <span className="text-gray-500 font-medium">Warning</span>
          <span className="font-bold text-amber-700">{exceptionsSummary.warning}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Informational</span>
          <span className="text-gray-600">{exceptionsSummary.informational}</span>
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
            <span>Placement Conflicts</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.placementConflicts}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Rendering Errors</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.renderingErrors}
          </span>
        </Link>

        <Link
          href="/admin/marketing/content"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-rose-600" />
            <span>Content Missing</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.contentMissing}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-rose-600" />
            <span>Governance Review</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.governanceReview}
          </span>
        </Link>

        <Link
          href="/admin/marketing/audiences"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Audience Warnings</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.audienceWarnings}
          </span>
        </Link>
      </div>

      {/* 8. FINAL EXPERIENCE ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Final Experience Actions
        </h3>

        <button
          onClick={onCreateCampaign}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-bold transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Placement Campaign</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Preview Website</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Preview App</span>
        </button>

        <Link
          href="/admin/marketing/governance"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Review Placement Exceptions</span>
        </Link>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Open Conflict Analysis</span>
        </button>

        <Link
          href="/admin/marketing/content"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Review Content Readiness</span>
        </Link>

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
