"use client";

import React from "react";
import Link from "next/link";
import { SelectedGovernanceRecord } from "@/data/marketingGovernance.mock";

interface SelectedGovernanceHeaderProps {
  record: SelectedGovernanceRecord | null;
}

export function SelectedGovernanceHeader({ record }: SelectedGovernanceHeaderProps) {
  if (!record) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-500">
          Selected Governance Record — <span className="font-normal text-gray-400">Select a governance record from the portfolio table above</span>
        </h3>
      </div>
    );
  }

  const { badges, metrics } = record;

  const getBadgeStyle = (txt: string) => {
    if (txt.includes("Approved") || txt.includes("Clear")) {
      return "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold";
    }
    if (txt.includes("Warning") || txt.includes("Review")) {
      return "bg-amber-50 text-amber-800 border-amber-200 font-bold";
    }
    return "bg-rose-50 text-rose-800 border-rose-200 font-bold";
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
      {/* Title & Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900">
          Selected Governance Record — <span className="text-[#800020] font-extrabold">{record.governanceItem}</span>
        </h3>

        {/* Dynamic Status Badges */}
        <span className={`px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(badges.campaignStatus)}`}>
          {badges.campaignStatus}
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(badges.consentStatus)}`}>
          {badges.consentStatus}
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(badges.rightsStatus)}`}>
          {badges.rightsStatus}
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(badges.frequencyStatus)}`}>
          {badges.frequencyStatus}
        </span>
      </div>

      {/* Right Metrics & Open Detail Button */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-3 text-center">
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Policy Checks</span>
            <span className="font-extrabold text-gray-900">{metrics.policyChecks}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Passed</span>
            <span className="font-extrabold text-emerald-700">{metrics.passed}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Warnings</span>
            <span className="font-extrabold text-amber-700">{metrics.warnings}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Blocked</span>
            <span className="font-extrabold text-rose-700">{metrics.blocked}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Pending Approval</span>
            <span className="font-extrabold text-blue-700">{metrics.pendingApproval}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Exceptions</span>
            <span className="font-extrabold text-rose-700">{metrics.exceptions}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Governance Score</span>
            <span className="font-extrabold text-emerald-700">{metrics.governanceScore}%</span>
          </div>
        </div>

        <Link
          href={`/admin/marketing/governance/${record.id}`}
          className="px-3 py-1.5 text-xs font-bold text-[#800020] bg-white hover:bg-rose-50 border border-[#800020] rounded-lg transition-colors"
        >
          Open Governance Detail
        </Link>
      </div>
    </div>
  );
}
