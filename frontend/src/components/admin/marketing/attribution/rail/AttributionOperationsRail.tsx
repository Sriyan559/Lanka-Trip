"use client";

import React from "react";
import Link from "next/link";
import { AttributionRailData } from "@/data/marketingAttribution.mock";
import {
  FileText,
  AlertTriangle,
  AlertOctagon,
  TrendingUp,
  RefreshCw,
  Layers,
  DollarSign,
} from "lucide-react";

interface AttributionOperationsRailProps {
  railData: AttributionRailData;
  onGenerateReport?: () => void;
}

export function AttributionOperationsRail({
  railData,
  onGenerateReport,
}: AttributionOperationsRailProps) {
  const {
    healthScore,
    healthLabel,
    healthDimensions,
    revenueSummary,
    conversionSummary,
    acquisitionSummary,
    coverageSummary,
    exceptionsSummary,
    quickQueues,
  } = railData;

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 text-xs text-gray-700 font-sans">
      {/* 1. ATTRIBUTION & ANALYTICS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Attribution & Analytics Health</h3>

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
            <span className="text-gray-500">Tracking Coverage</span>
            <span className="font-bold text-gray-900">{healthDimensions.trackingCoverage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Identity Resolution</span>
            <span className="font-bold text-gray-900">{healthDimensions.identityResolution}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Revenue Coverage</span>
            <span className="font-bold text-gray-900">{healthDimensions.revenueCoverage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Attribution Confidence</span>
            <span className="font-bold text-gray-900">{healthDimensions.attributionConfidence}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Conversion Deduplication</span>
            <span className="font-bold text-gray-900">{healthDimensions.conversionDeduplication}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Finance Alignment</span>
            <span className="font-bold text-gray-900">{healthDimensions.financeAlignment}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Model Governance</span>
            <span className="font-bold text-gray-900">{healthDimensions.modelGovernance}%</span>
          </div>
        </div>

        <div className="mt-2 text-center">
          <button className="text-[11px] font-bold text-[#800020] hover:underline cursor-pointer">
            View Full Health
          </button>
        </div>
      </div>

      {/* 2. REVENUE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Revenue Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Marketing Spend</span>
          <span className="font-bold text-rose-700">{revenueSummary.spend}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Attributed Revenue</span>
          <span className="font-bold text-emerald-700">{revenueSummary.attributedRevenue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Assisted Revenue</span>
          <span className="font-bold text-blue-700">{revenueSummary.assistedRevenue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">ROAS</span>
          <span className="font-bold text-blue-700">{revenueSummary.roas}</span>
        </div>
      </div>

      {/* 3. CONVERSION SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Conversion Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Attributed Conversions</span>
          <span className="font-bold text-gray-900">{conversionSummary.attributedConversions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Influenced Orders</span>
          <span className="font-bold text-gray-900">{conversionSummary.influencedOrders}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Direct Conversions</span>
          <span className="font-bold text-emerald-700">{conversionSummary.directConversions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Assisted Conversions</span>
          <span className="font-bold text-blue-700">{conversionSummary.assistedConversions}</span>
        </div>
      </div>

      {/* 4. ACQUISITION SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Acquisition Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">New Customers</span>
          <span className="font-bold text-gray-900">{acquisitionSummary.newCustomers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Average CAC</span>
          <span className="font-bold text-rose-700">{acquisitionSummary.averageCac}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">New Customer Revenue</span>
          <span className="font-bold text-emerald-700">{acquisitionSummary.newCustomerRevenue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">30D Repeat Purchase</span>
          <span className="font-bold text-blue-700">{acquisitionSummary.repeatPurchaseRoas}</span>
        </div>
      </div>

      {/* 5. COVERAGE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Coverage Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Tracking Coverage</span>
          <span className="font-bold text-gray-900">{coverageSummary.trackingCoverage}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Identity Coverage</span>
          <span className="font-bold text-gray-900">{coverageSummary.identityCoverage}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Revenue Coverage</span>
          <span className="font-bold text-gray-900">{coverageSummary.revenueCoverage}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Data Completeness</span>
          <span className="font-bold text-gray-900">{coverageSummary.dataCompleteness}%</span>
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
            <span>Tracking Gaps</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.trackingGaps}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Attribution Variance</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-bold text-[10px]">
            {quickQueues.attributionVariance}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Identity Warnings</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px]">
            {quickQueues.identityWarnings}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-rose-600" />
            <span>Revenue Sync Warning</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px]">
            {quickQueues.revenueSyncWarning}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-rose-600" />
            <span>Model Reviews</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[10px]">
            {quickQueues.modelReviews}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Data Quality Issues</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-bold text-[10px]">
            {quickQueues.dataQualityIssues}
          </span>
        </Link>
      </div>

      {/* 8. FINAL ANALYTICS ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Final Analytics Actions
        </h3>

        <button
          onClick={onGenerateReport}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg bg-[#800020] text-white font-bold transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>+ Generate Executive Report</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Compare Attribution Models</span>
        </button>

        <Link
          href="/admin/marketing/governance"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Review Analytics Exceptions</span>
        </Link>

        <Link
          href="/admin/marketing/campaigns"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Open Campaign Performance</span>
        </Link>

        <Link
          href="/admin/marketing/channels"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Open Channel Analytics</span>
        </Link>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Review Revenue Alignment</span>
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
