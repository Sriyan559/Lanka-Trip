"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function SelectedContentSummary({
  contentName = "Summer Beauty Festival Hero",
  contentId = "CNT-2026-0164",
  status = "Active",
  approvalStatus = "Approved",
  rightsState = "Rights Valid",
}: {
  contentName?: string;
  contentId?: string;
  status?: string;
  approvalStatus?: string;
  rightsState?: string;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <h2 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
          Selected Content — <span className="text-[#800020]">{contentName}</span>
        </h2>

        <div className="flex items-center gap-1.5 ml-1">
          <MarketingStatusChip status={status} className="text-[9px] px-2 py-0.5" />
          <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
            {approvalStatus}
          </span>
          <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
            {rightsState}
          </span>
        </div>
      </div>

      <Link
        href={`/admin/marketing/content/${contentId}`}
        className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors h-7 shrink-0"
      >
        <span>Open Content Detail</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
