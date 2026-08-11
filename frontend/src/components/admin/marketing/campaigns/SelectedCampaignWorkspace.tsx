"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CampaignPortfolioRecord } from "@/data/campaignManagement.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import { ExternalLink } from "lucide-react";

interface SelectedCampaignWorkspaceProps {
  campaign: CampaignPortfolioRecord | null;
}

const WORKSPACE_TABS = [
  "Overview",
  "Audience",
  "Channels",
  "Budget",
  "Performance",
  "Linked Promotions",
  "Activity",
  "Audit",
];

export function SelectedCampaignWorkspace({
  campaign,
}: SelectedCampaignWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!campaign) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs text-center text-xs text-gray-400 font-medium">
        Select a campaign from the portfolio table to inspect operational details.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs p-3 sm:p-3.5 flex flex-col">
      {/* Header & Open Campaign Detail Link */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
        <h4 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-2">
          <span>Selected Campaign:</span>
          <span className="text-[#800020]">{campaign.name}</span>
          <span className="text-gray-400 font-mono text-[11px]">({campaign.code})</span>
        </h4>

        <Link
          href={`/admin/marketing/campaigns/${campaign.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#800020] bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
        >
          <span>Open Campaign Detail</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Workspace Subtabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-100 py-1.5 text-[11px] font-semibold text-gray-500 scrollbar-none whitespace-nowrap">
        {WORKSPACE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-0.5 rounded-md cursor-pointer transition-colors ${
              activeTab === tab
                ? "bg-rose-50 text-[#800020] font-bold border border-rose-200/80"
                : "hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Tab View */}
      {activeTab === "Overview" ? (
        <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-4 gap-y-3 text-[11px] divide-x-0 sm:divide-x divide-gray-100">
          <div className="pr-2">
            <span className="block text-gray-400 font-medium text-[10px]">Campaign Overview</span>
            <span className="font-bold text-gray-900 block mt-0.5">{campaign.owner}</span>
            <span className="text-[10px] text-gray-500 leading-tight block mt-0.5 line-clamp-2">
              {campaign.objective}
            </span>
          </div>

          <div className="sm:pl-3 pr-2">
            <span className="block text-gray-400 font-medium text-[10px]">Type / Period</span>
            <span className="font-bold text-gray-900 block mt-0.5">{campaign.type}</span>
            <span className="text-[10px] text-gray-500 block mt-0.5">{campaign.startDate} – {campaign.endDate}</span>
          </div>

          <div className="sm:pl-3 pr-2">
            <span className="block text-gray-400 font-medium text-[10px]">Primary Channel / Audience</span>
            <span className="font-bold text-gray-900 block mt-0.5">{campaign.channels[0] || "Email"}</span>
            <span className="text-[10px] text-gray-600 block mt-0.5 font-mono">{campaign.audience}</span>
          </div>

          <div className="sm:pl-3 pr-2">
            <span className="block text-gray-400 font-medium text-[10px]">Budget & Spend</span>
            <span className="font-bold text-gray-900 block mt-0.5">{campaign.budget}</span>
            <span className="text-[10px] font-semibold text-[#800020] block mt-0.5">
              Spend: {campaign.spend} (81%)
            </span>
          </div>

          <div className="sm:pl-3 pr-2">
            <span className="block text-gray-400 font-medium text-[10px]">Attributed Revenue</span>
            <span className="font-bold text-[#800020] text-sm block mt-0.5">{campaign.revenue}</span>
            <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
              ROAS {campaign.roas} (Target 3.20x)
            </span>
          </div>

          <div className="sm:pl-3 pr-2">
            <span className="block text-gray-400 font-medium text-[10px]">Conversion Rate</span>
            <span className="font-bold text-emerald-700 text-sm block mt-0.5">{campaign.conversion}</span>
            <span className="text-[10px] text-gray-500 block mt-0.5">Target 4.5%</span>
          </div>

          <div className="sm:pl-3">
            <span className="block text-gray-400 font-medium text-[10px] mb-1">Health & Governance</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-gray-400">Approval:</span>
                <MarketingStatusChip status={campaign.approvalStatus} className="px-1.5 py-0 text-[9px]" />
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-gray-400">Gov:</span>
                <MarketingStatusChip status={campaign.governanceStatus} className="px-1.5 py-0 text-[9px]" />
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-gray-400">Delivery:</span>
                <MarketingStatusChip status={campaign.deliveryHealth} className="px-1.5 py-0 text-[9px]" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4 text-center text-xs text-gray-500 font-medium">
          Detailed {activeTab} workspace for {campaign.name} loaded.
        </div>
      )}
    </div>
  );
}
