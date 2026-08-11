"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { AttributionData } from "@/data/campaignDetail.mock";

export function CampaignAttributionPanel({
  attribution,
}: {
  attribution: AttributionData;
}) {
  return (
    <MarketingSectionCard
      title="Attribution"
      footerLink={{
        label: "Open Attribution Details",
        href: "/admin/marketing/attribution-analytics",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-3 font-sans">
        {/* Top Attributed Metrics */}
        <div className="grid grid-cols-4 gap-2 text-center bg-emerald-50/50 p-2 rounded-lg border border-emerald-100 text-xs">
          <div>
            <span className="text-gray-500 block text-[9px]">Attributed Revenue</span>
            <span className="font-bold text-emerald-800 text-xs">{attribution.attributedRevenue}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-[9px]">Attributed Conv.</span>
            <span className="font-bold text-gray-900 text-xs">{attribution.attributedConversions}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-[9px]">Attributed ROAS</span>
            <span className="font-bold text-emerald-700 text-xs">{attribution.roasAttributed}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-[9px]">Incremental Lift</span>
            <span className="font-bold text-emerald-700 text-xs">{attribution.incrementalLift}</span>
          </div>
        </div>

        {/* Channel Contribution Bars */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
            Channel Contribution to Revenue
          </span>
          {attribution.channelContribution.map((item) => (
            <div key={item.channel} className="flex items-center gap-2 text-xs">
              <span className="w-24 text-gray-700 font-medium truncate">{item.channel}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono font-bold text-gray-900 text-[10px]">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Model Info */}
        <div className="flex justify-between items-center text-[10.5px] border-t border-gray-100 pt-2 text-gray-600">
          <div>
            <span className="text-gray-400 block text-[9px]">Top Attribution Model</span>
            <span className="font-semibold text-gray-900">{attribution.topModel}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block text-[9px]">Lookback Window</span>
            <span className="font-semibold text-gray-900">{attribution.lookbackWindow}</span>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
