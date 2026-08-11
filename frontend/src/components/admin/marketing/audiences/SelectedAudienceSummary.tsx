"use client";

import React from "react";
import Link from "next/link";
import { SelectedAudienceDetails } from "@/data/marketingAudience.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import { ExternalLink, MoreVertical } from "lucide-react";

export function SelectedAudienceSummary({
  details,
}: {
  details: SelectedAudienceDetails;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs font-sans flex flex-col gap-3">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
            Selected Audience — {details.name}
          </h2>
          <MarketingStatusChip status={details.status} className="text-[9px] px-2 py-0.3" />
          <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {details.code}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/admin/marketing/audiences/${details.code}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/40 hover:bg-rose-50/50 rounded-lg transition-colors shadow-2xs"
          >
            <span>Open Audience Detail</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button className="p-1 text-gray-400 hover:text-gray-700 rounded">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 divide-x divide-gray-100 text-xs">
        <div className="flex flex-col pl-1">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Eligible Customers
          </span>
          <span className="text-base font-extrabold text-gray-900 mt-0.5">
            {details.eligibleCustomers}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Marketable Customers
          </span>
          <span className="text-base font-extrabold text-gray-900 mt-0.5">
            {details.marketableCustomers}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Suppressed Customers
          </span>
          <span className="text-base font-extrabold text-rose-600 mt-0.5">
            {details.suppressedCustomers}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Reachable Customers
          </span>
          <span className="text-base font-extrabold text-emerald-700 mt-0.5">
            {details.reachableCustomers}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Paid Media Match
          </span>
          <span className="text-base font-extrabold text-emerald-700 mt-0.5">
            {details.paidMediaMatch}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Linked Campaigns
          </span>
          <span className="text-base font-extrabold text-gray-900 mt-0.5">
            {details.linkedCampaignsCount}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Failed / Outdated
          </span>
          <span className="text-base font-extrabold text-rose-600 mt-0.5">
            {details.failedOutdated}
          </span>
        </div>
      </div>
    </div>
  );
}
