"use client";

import React from "react";
import Link from "next/link";
import { GovernanceRailData } from "@/data/marketingGovernance.mock";
import {
  Plus,
  Clock,
  AlertTriangle,
  AlertOctagon,
  Bell,
  FileCheck,
  BookOpen,
  FileText,
} from "lucide-react";

interface GovernanceOperationsRailProps {
  railData: GovernanceRailData;
  onCreatePolicy?: () => void;
  onFilterQueue?: (queueKey: string) => void;
}

export function GovernanceOperationsRail({
  railData,
  onCreatePolicy,
  onFilterQueue,
}: GovernanceOperationsRailProps) {
  const {
    healthScore,
    healthLabel,
    governanceSummary,
    approvalSummary,
    consentSummary,
    frequencySummary,
    exceptionsSummary,
    quickQueues,
  } = railData;

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 text-xs text-gray-700 font-sans">
      {/* 1. MARKETING GOVERNANCE HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Marketing Governance Health</h3>

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
      </div>

      {/* 2. GOVERNANCE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Governance Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Active Policies</span>
          <span className="font-bold text-gray-900">{governanceSummary.activePolicies}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Clear</span>
          <span className="font-bold text-emerald-700">{governanceSummary.clear}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warning</span>
          <span className="font-bold text-amber-700">{governanceSummary.warning}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Review Required</span>
          <span className="font-bold text-orange-700">{governanceSummary.reviewRequired}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Blocked</span>
          <span className="font-bold text-rose-700">{governanceSummary.blocked}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Exception Granted</span>
          <span className="font-bold text-purple-700">{governanceSummary.exceptionGranted}</span>
        </div>
      </div>

      {/* 3. APPROVAL SUMMARY */}
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
          <span className="text-gray-500 font-medium">High Priority</span>
          <span className="font-bold text-rose-700">{approvalSummary.highPriority}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Average Time</span>
          <span className="font-mono text-gray-700">{approvalSummary.averageTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">SLA</span>
          <span className="font-bold text-emerald-700">{approvalSummary.sla}</span>
        </div>
      </div>

      {/* 4. CONSENT & ELIGIBILITY SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100 flex justify-between items-center">
          <span>Consent & Eligibility Summary</span>
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Evaluated</span>
          <span className="font-bold text-gray-900 font-mono">{consentSummary.evaluated}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Marketable</span>
          <span className="font-bold text-emerald-700 font-mono">{consentSummary.marketable}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Suppressed</span>
          <span className="font-bold text-rose-700 font-mono">{consentSummary.suppressed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warnings</span>
          <span className="font-bold text-amber-700">{consentSummary.warnings}</span>
        </div>
      </div>

      {/* 5. FREQUENCY SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Frequency Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Evaluated Customers</span>
          <span className="font-bold text-gray-900 font-mono">{frequencySummary.evaluatedCustomers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warnings</span>
          <span className="font-bold text-amber-700">{frequencySummary.warnings}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Affected</span>
          <span className="font-bold text-orange-700 font-mono">{frequencySummary.affected.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Critical</span>
          <span className="font-bold text-rose-700">{frequencySummary.critical}</span>
        </div>
      </div>

      {/* 6. EXCEPTIONS SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Exceptions Summary
        </h3>
        <div className="grid grid-cols-4 gap-1 text-center text-xs">
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Pending</span>
            <span className="font-bold text-amber-700">{exceptionsSummary.pending}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Approved</span>
            <span className="font-bold text-emerald-700">{exceptionsSummary.approved}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Severe</span>
            <span className="font-bold text-rose-700">{exceptionsSummary.severe}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Expired</span>
            <span className="font-bold text-gray-500">{exceptionsSummary.expired}</span>
          </div>
        </div>
      </div>

      {/* 7. QUICK QUEUES */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Quick Queues
        </h3>

        <button
          onClick={() => onFilterQueue?.("approvalPending")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-rose-600" />
            <span>Approval Pending</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.approvalPending}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("approvalOverdue")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Approval Overdue</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.approvalOverdue}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("contentWarnings")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Content Warnings</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px]">
            {quickQueues.contentWarnings}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("frequencyWarnings")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-rose-600" />
            <span>Frequency Warnings</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-orange-600 text-white font-bold text-[10px]">
            {quickQueues.frequencyWarnings}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("contentRightsReviews")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FileCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Content / Rights Reviews</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-bold text-[10px]">
            {quickQueues.contentRightsReviews}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("policyExceptions")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Policy Exceptions</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.policyExceptions}
          </span>
        </button>
      </div>

      {/* 8. FINAL GOVERNANCE ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Final Governance Actions
        </h3>

        <button
          onClick={onCreatePolicy}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg bg-[#800020] text-white font-bold transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create Governance Policy</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Review Approval Queue</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Review Governance Exceptions</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Review Consent Warnings</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Review Frequency Exceptions</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Open Policy Library</span>
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
