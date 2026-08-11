"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { CampaignExceptionRecord } from "@/data/campaignManagement.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import Link from "next/link";

export function CampaignExceptionsPanel({
  exceptions = [],
}: {
  exceptions: CampaignExceptionRecord[];
}) {
  // Deterministic Grid Template: Campaign | Issue | Impact | Action
  const gridTemplate = "grid-cols-[minmax(0,1.65fr)_minmax(80px,1.1fr)_minmax(0,1.1fr)_68px]";

  return (
    <MarketingSectionCard
      title="Campaign Exceptions"
      footerLink={{
        label: "View All Exceptions",
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
          <div className="min-w-0 overflow-hidden truncate">ISSUE</div>
          <div className="min-w-0 overflow-hidden truncate">IMPACT</div>
          <div className="min-w-0 text-right truncate">ACTION</div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-gray-100 font-medium text-[9px]">
          {exceptions.map((ex) => (
            <div
              key={ex.id}
              className={`grid ${gridTemplate} gap-1.5 items-center px-1.5 py-0.5 hover:bg-gray-50/50 min-h-[24px]`}
            >
              {/* Campaign Cell */}
              <div className="min-w-0 overflow-hidden truncate font-semibold text-gray-900 text-[10px]" title={ex.campaignName}>
                {ex.campaignName}
              </div>

              {/* Issue Cell */}
              <div className="min-w-0 overflow-hidden flex items-center">
                <MarketingStatusChip status={ex.issue} className="text-[8px] px-1.5 py-0.3 shrink-0" />
              </div>

              {/* Impact Cell */}
              <div className="min-w-0 overflow-hidden text-[9px] text-gray-600 truncate" title={ex.impact}>
                {ex.impact}
              </div>

              {/* Action Cell */}
              <div className="min-w-0 text-right whitespace-nowrap">
                <Link
                  href="/admin/marketing/governance"
                  className="text-[9px] font-bold text-[#800020] hover:underline"
                >
                  {ex.actionText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}




