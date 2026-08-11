"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ApprovalQueueRecord } from "@/data/campaignManagement.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import Link from "next/link";

export function ApprovalQueue({ records = [] }: { records: ApprovalQueueRecord[] }) {
  // Deterministic Grid Template: Campaign | Status | Submitted | Next Approver | Risk | Action
  const gridTemplate = "grid-cols-[minmax(0,2.2fr)_minmax(65px,1.0fr)_minmax(42px,0.6fr)_minmax(0,1.3fr)_42px_48px]";

  return (
    <MarketingSectionCard
      title="Approval Queue"
      footerLink={{
        label: "Open Governance Queue",
        href: "/admin/marketing/governance",
      }}
      className="h-auto"
      bodyClassName="p-1 sm:p-1.5 flex flex-col justify-start min-h-0"
    >
      <div className="w-full flex flex-col font-sans">
        {/* Header Row */}
        <div
          className={`grid ${gridTemplate} gap-1.5 items-center bg-gray-50/90 px-1.5 py-1 font-bold text-gray-400 border-b border-gray-100 uppercase tracking-tight text-[8px] shrink-0`}
        >
          <div className="min-w-0 overflow-hidden truncate">CAMPAIGN</div>
          <div className="min-w-0 overflow-hidden truncate">STATUS</div>
          <div className="min-w-0 overflow-hidden truncate">SUBMITTED</div>
          <div className="min-w-0 overflow-hidden truncate">NEXT APPROVER</div>
          <div className="min-w-0 text-center truncate">RISK</div>
          <div className="min-w-0 text-right truncate">ACTION</div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-gray-100 font-medium text-[9px]">
          {records.map((r) => (
            <div
              key={r.id}
              className={`grid ${gridTemplate} gap-1.5 items-center px-1.5 py-0.5 hover:bg-gray-50/50 min-h-[24px]`}
            >
              {/* Campaign Cell */}
              <div className="min-w-0 overflow-hidden truncate font-semibold text-gray-900 text-[10px]" title={r.campaignName}>
                {r.campaignName}
              </div>

              {/* Status Cell */}
              <div className="min-w-0 overflow-hidden flex items-center">
                <MarketingStatusChip status={r.status} className="text-[8px] px-1.5 py-0.3 shrink-0" />
              </div>

              {/* Submitted Cell */}
              <div className="min-w-0 overflow-hidden text-[9px] text-gray-500 whitespace-nowrap truncate">
                {r.submitted}
              </div>

              {/* Next Approver Cell */}
              <div className="min-w-0 overflow-hidden text-[9px] text-gray-700 truncate" title={r.nextApprover}>
                {r.nextApprover}
              </div>

              {/* Risk Cell */}
              <div className="min-w-0 flex justify-center">
                <span className="text-[8px] font-bold px-1.5 py-0.3 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {r.risk}
                </span>
              </div>

              {/* Action Cell */}
              <div className="min-w-0 text-right whitespace-nowrap">
                <Link
                  href="/admin/marketing/governance"
                  className="text-[9px] font-bold text-[#800020] hover:underline"
                >
                  {r.status === "Not Submitted" ? "Open" : "Review"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}




