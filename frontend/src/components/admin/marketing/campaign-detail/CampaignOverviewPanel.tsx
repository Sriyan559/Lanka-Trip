"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { CampaignOverviewData } from "@/data/campaignDetail.mock";

export function CampaignOverviewPanel({
  overview,
}: {
  overview: CampaignOverviewData;
}) {
  return (
    <MarketingSectionCard title="Campaign Overview" className="h-full">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans p-1">
        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Campaign Goal</span>
          <span className="font-semibold text-gray-900 leading-snug">{overview.goal}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Start Date</span>
          <span className="font-semibold text-gray-900">{overview.startDate}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">End Date</span>
          <span className="font-semibold text-gray-900">{overview.endDate}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Campaign Region</span>
          <span className="font-semibold text-gray-900">{overview.region}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Campaign Type</span>
          <span className="font-semibold text-gray-900">{overview.type}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Campaign Tier</span>
          <span className="font-semibold text-gray-900">{overview.tier}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Campaign Goal Type</span>
          <span className="font-semibold text-gray-900">{overview.goalType}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Created On</span>
          <span className="font-semibold text-gray-900">{overview.createdOn}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Business Unit</span>
          <span className="font-semibold text-gray-900">{overview.businessUnit}</span>
        </div>

        <div>
          <span className="text-gray-400 font-medium block text-[10px]">Last Updated</span>
          <span className="font-semibold text-gray-900">{overview.lastUpdated}</span>
        </div>

        <div className="col-span-2">
          <span className="text-gray-400 font-medium block text-[10px]">Primary Channel</span>
          <span className="font-semibold text-gray-900">{overview.primaryChannel}</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
