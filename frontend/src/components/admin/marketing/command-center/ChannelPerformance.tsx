"use client";

import React from "react";
import { ChannelPerformanceRow } from "@/data/marketingCommandCenter.mock";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { Mail, MessageSquare, Bell, Share2, Search } from "lucide-react";

const CHANNEL_ICONS: Record<string, React.ElementType> = {
  Mail,
  MessageSquare,
  Bell,
  Share2,
  Search,
};

export function ChannelPerformance({
  channels,
}: {
  channels: ChannelPerformanceRow[];
}) {
  return (
    <MarketingSectionCard
      title="Channel Performance"
      subtitle="Delivery, conversions & revenue by channel"
      className="h-full"
      footerLink={{
        label: "View All Channels",
        href: "/admin/marketing/channels",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left text-gray-700">
          <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-100">
            <tr>
              <th className="py-1.5 px-2">Channel</th>
              <th className="py-1.5 px-2 text-right">Delivered / Spend</th>
              <th className="py-1.5 px-2 text-right">Engagement</th>
              <th className="py-1.5 px-2 text-right">Conversions</th>
              <th className="py-1.5 px-2 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {channels.map((ch) => {
              const IconComp = CHANNEL_ICONS[ch.icon] || Mail;
              return (
                <tr key={ch.channel} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-2 px-2 flex items-center gap-1.5 font-semibold text-gray-900">
                    <div className="w-5 h-5 rounded bg-rose-50 border border-rose-100 flex items-center justify-center text-[#800020]">
                      <IconComp className="w-3 h-3" />
                    </div>
                    <span>{ch.channel}</span>
                  </td>
                  <td className="py-2 px-2 text-right text-gray-800 font-medium">
                    {ch.deliveredOrSpend}
                  </td>
                  <td className="py-2 px-2 text-right text-gray-600">
                    {ch.engagement}
                  </td>
                  <td className="py-2 px-2 text-right text-gray-900 font-semibold">
                    {ch.conversions}
                  </td>
                  <td className="py-2 px-2 text-right text-[#800020] font-bold">
                    {ch.revenue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
