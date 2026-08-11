"use client";

import React, { useState } from "react";
import { CampaignPortfolioItem } from "@/data/marketingCommandCenter.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import { X } from "lucide-react";

interface SelectedCampaignSummaryProps {
  campaign: CampaignPortfolioItem | null;
  onClose?: () => void;
}

const INNER_TABS = [
  "Overview",
  "Audience",
  "Budget",
  "Channels",
  "Governance",
  "Linked Promotions",
  "Activity",
];

export function SelectedCampaignSummary({
  campaign,
  onClose,
}: SelectedCampaignSummaryProps) {
  const [activeInnerTab, setActiveInnerTab] = useState("Overview");

  if (!campaign) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs text-center text-xs text-gray-400">
        Select a campaign from the portfolio table to view summary details.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs p-2.5 sm:p-3 flex flex-col">
      {/* Top Header & Close Button */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
        <h4 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5 truncate">
          <span className="text-gray-500 font-semibold">Selected Campaign:</span>
          <span className="text-[#800020] font-bold">{campaign.name}</span>
        </h4>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-0.5 rounded-md cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Inner Tabs Row */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-100 py-1.5 text-[11px] font-semibold text-gray-500 scrollbar-none whitespace-nowrap">
        {INNER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveInnerTab(tab)}
            className={`px-2 py-0.5 rounded-md shrink-0 cursor-pointer transition-colors ${
              activeInnerTab === tab
                ? "bg-rose-50 text-[#800020] font-bold"
                : "hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Tab View - Compact 4-Column Grid matching IMAGE 3 */}
      {activeInnerTab === "Overview" ? (
        <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-2.5 text-[11px]">
          {/* Row 1 */}
          <div>
            <span className="block text-gray-400 font-medium text-[10px]">
              Campaign Owner
            </span>
            <span className="font-semibold text-gray-900 leading-tight">
              {campaign.owner}
            </span>
          </div>

          <div>
            <span className="block text-gray-400 font-medium text-[10px]">
              Campaign Period
            </span>
            <span className="font-semibold text-gray-900 leading-tight">
              {campaign.period}
            </span>
          </div>

          <div>
            <span className="block text-gray-400 font-medium text-[10px]">
              Objective
            </span>
            <span className="font-semibold text-gray-900 leading-tight line-clamp-1">
              {campaign.objective}
            </span>
          </div>

          <div>
            <span className="block text-gray-400 font-medium text-[10px]">
              Primary Channel
            </span>
            <span className="font-semibold text-gray-900 leading-tight">
              {campaign.primaryChannel}
            </span>
          </div>

          {/* Row 2 */}
          <div>
            <span className="block text-gray-400 font-medium text-[10px] mb-0.5">
              Status
            </span>
            <MarketingStatusChip status={campaign.status} />
          </div>

          <div>
            <span className="block text-gray-400 font-medium text-[10px]">
              Spend
            </span>
            <span className="font-bold text-gray-900 leading-tight">
              {campaign.spend}
            </span>
          </div>

          <div>
            <span className="block text-gray-400 font-medium text-[10px]">
              Revenue
            </span>
            <span className="font-bold text-[#800020] leading-tight">
              {campaign.revenue}
            </span>
          </div>

          <div>
            <span className="block text-gray-400 font-medium text-[10px]">
              ROAS / Conv
            </span>
            <span className="font-bold text-emerald-700 leading-tight">
              {campaign.roas}{" "}
              <span className="font-semibold text-emerald-600">
                ({campaign.conversion})
              </span>
            </span>
          </div>
        </div>
      ) : (
        <div className="py-3 text-center text-xs text-gray-500 font-medium">
          Detailed {activeInnerTab} metrics for {campaign.name} loaded.
        </div>
      )}
    </div>
  );
}
