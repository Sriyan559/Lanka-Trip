"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { GovernanceIssue } from "@/data/marketingCommandCenter.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import Link from "next/link";

interface ApprovalsGovernanceProps {
  awaitingApproval: number;
  consentWarnings: number;
  frequencyCapExceptions: number;
  creativePolicyReviews: number;
  issues: GovernanceIssue[];
}

export function ApprovalsGovernance({
  awaitingApproval,
  consentWarnings,
  frequencyCapExceptions,
  creativePolicyReviews,
  issues = [],
}: ApprovalsGovernanceProps) {
  return (
    <MarketingSectionCard
      title="Approvals & Governance"
      subtitle="Policy compliance, consent warnings and approval queue"
      footerLink={{
        label: "Open Marketing Governance",
        href: "/admin/marketing/governance",
      }}
      className="h-full"
    >
      {/* 4 Mini KPI Stat Boxes */}
      <div className="grid grid-cols-4 gap-2 bg-gray-50/80 p-2 rounded-lg text-center border border-gray-100 mb-3">
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase leading-tight">
            Awaiting Approval
          </span>
          <span className="text-sm font-extrabold text-amber-700">
            {awaitingApproval}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase leading-tight">
            Consent Warnings
          </span>
          <span className="text-sm font-extrabold text-rose-700">
            {consentWarnings}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase leading-tight">
            Frequency Cap
          </span>
          <span className="text-sm font-extrabold text-purple-700">
            {frequencyCapExceptions}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase leading-tight">
            Creative Reviews
          </span>
          <span className="text-sm font-extrabold text-blue-700">
            {creativePolicyReviews}
          </span>
        </div>
      </div>

      {/* Latest Issues List */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Latest Issues
        </h4>
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-50/70 border border-gray-100 hover:bg-gray-100/70 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <MarketingStatusChip status={issue.type} />
                <span className="text-xs font-bold text-gray-900 truncate">
                  {issue.title}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">
                {issue.subtitle}
              </p>
            </div>

            <Link
              href="/admin/marketing/governance"
              className="px-2.5 py-1 text-[11px] font-bold text-[#800020] bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md shrink-0 cursor-pointer"
            >
              {issue.actionText}
            </Link>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
