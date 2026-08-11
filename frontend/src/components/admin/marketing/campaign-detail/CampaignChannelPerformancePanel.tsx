"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ChannelPerformanceItem } from "@/data/campaignDetail.mock";

export function CampaignChannelPerformancePanel({
  channels = [],
}: {
  channels: ChannelPerformanceItem[];
}) {
  return (
    <MarketingSectionCard
      title="Channel Performance"
      footerLink={{
        label: "Open Channel Details",
        href: "/admin/marketing/channels",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        <table className="w-full text-xs text-left text-gray-700 table-fixed">
          <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[9px]">
            <tr>
              <th className="py-1.5 px-1 w-[22%]">Channel</th>
              <th className="py-1.5 px-1 w-[12%]">Share</th>
              <th className="py-1.5 px-1 w-[20%]">Delivered</th>
              <th className="py-1.5 px-1 w-[15%]">Eng. %</th>
              <th className="py-1.5 px-1 w-[13%]">Clicks</th>
              <th className="py-1.5 px-1 w-[18%]">Conversions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-[11px]">
            {channels.map((ch) => (
              <tr key={ch.id} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1 font-semibold text-gray-900 truncate">
                  {ch.channel}
                </td>
                <td className="py-1.5 px-1 text-gray-500 font-mono text-[10px]">
                  {ch.share}
                </td>
                <td className="py-1.5 px-1 font-mono text-gray-800 truncate">
                  {ch.impressions}
                </td>
                <td className="py-1.5 px-1 font-mono text-gray-800">
                  {ch.engagement}
                </td>
                <td className="py-1.5 px-1 font-mono text-gray-800">
                  {ch.clicks}
                </td>
                <td className="py-1.5 px-1 font-mono font-bold text-emerald-700 truncate">
                  {ch.conversions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
