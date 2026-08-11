"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ChannelContributionItem } from "@/data/marketingCommandCenter.mock";

interface AttributionSnapshotProps {
  attributedRevenue: string;
  assistedRevenue: string;
  influencedOrders: string;
  averageCac: string;
  contributions: ChannelContributionItem[];
}

export function AttributionSnapshot({
  attributedRevenue,
  assistedRevenue,
  influencedOrders,
  averageCac,
  contributions = [],
}: AttributionSnapshotProps) {
  return (
    <MarketingSectionCard
      title="Attribution Snapshot"
      subtitle="Multi-touch revenue attribution & acquisition costs"
      footerLink={{
        label: "Open Attribution Analytics",
        href: "/admin/marketing/attribution-analytics",
      }}
    >
      {/* 4-Metric Grid with no text overlap */}
      <div className="grid grid-cols-4 gap-0.5 bg-gray-50/80 p-1.5 rounded-lg text-center border border-gray-100 mb-2">
        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="Attributed Revenue"
          >
            Attributed Rev
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-[#800020] leading-tight block truncate">
            {attributedRevenue}
          </span>
        </div>

        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="Assisted Revenue"
          >
            Assisted Rev
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-gray-800 leading-tight block truncate">
            {assistedRevenue}
          </span>
        </div>

        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="Influenced Orders"
          >
            Influenced
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-gray-900 leading-tight block truncate">
            {influencedOrders}
          </span>
        </div>

        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="Average CAC"
          >
            Avg CAC
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-emerald-700 leading-tight block truncate">
            {averageCac}
          </span>
        </div>
      </div>

      {/* Channel Contribution Breakdown */}
      <div className="space-y-1 text-[11px]">
        <h4 className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          Channel Contribution Breakdown
        </h4>
        {contributions.map((c) => (
          <div key={c.channel} className="space-y-0.5">
            <div className="flex items-center justify-between text-gray-700 font-medium text-[10px]">
              <span className="truncate">{c.channel}</span>
              <span className="font-bold text-gray-900 ml-1">{c.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#800020] h-full rounded-full"
                style={{ width: `${c.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
