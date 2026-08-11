"use client";

import React from "react";
import Link from "next/link";
import { CampaignDetailHeaderData } from "@/data/campaignDetail.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import {
  Download,
  ChevronDown,
  Copy,
  PauseCircle,
  Edit,
  ChevronRight,
} from "lucide-react";

export function CampaignDetailHeader({
  header,
}: {
  header: CampaignDetailHeaderData;
}) {
  return (
    <div className="flex flex-col gap-2 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
        <Link href="/admin/marketing" className="hover:text-gray-900 transition-colors">
          Marketing
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/admin/marketing/campaigns" className="hover:text-gray-900 transition-colors">
          Campaigns
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-bold text-gray-900">{header.code}</span>
      </div>

      {/* Main Title & Action Buttons Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {header.title}
            </h1>
            <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {header.code}
            </span>
            <MarketingStatusChip status={header.lifecycleStatus} />
            <MarketingStatusChip status={header.approvalStatus} />
            <MarketingStatusChip status={header.governanceStatus} />
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {header.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Campaign Report</span>
          </button>

          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <span>More Actions</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <Copy className="w-3.5 h-3.5 text-gray-500" />
            <span>Duplicate</span>
          </button>

          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors shadow-2xs">
            <PauseCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Pause Campaign</span>
          </button>

          <Link
            href={`/admin/marketing/campaigns/${header.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Campaign</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
