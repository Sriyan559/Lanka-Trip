"use client";

import React from "react";
import Link from "next/link";
import { CampaignUsageDetails } from "@/data/marketingChannels.mock";

interface CampaignUsageCardProps {
  details: CampaignUsageDetails;
}

export function CampaignUsageCard({ details }: CampaignUsageCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Active Campaign Usage
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Active Campaigns</span>
            <span className="font-bold text-gray-900">{details.activeCampaigns}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Messages Today</span>
            <span className="font-bold text-gray-900">{details.messagesToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">% of Daily Limit Used</span>
            <span className="font-bold text-amber-700">{details.percentDailyLimitUsed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Top Campaign</span>
            <span className="font-semibold text-gray-900">{details.topCampaign}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Next Scheduled</span>
            <span className="font-mono text-[11px] text-gray-700">{details.nextScheduled}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/campaigns"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View Campaigns
        </Link>
      </div>
    </div>
  );
}
