"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ContentCreativeItem } from "@/data/campaignDetail.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function CampaignContentCreativePanel({
  items = [],
}: {
  items: ContentCreativeItem[];
}) {
  return (
    <MarketingSectionCard
      title="Content & Creative"
      footerLink={{
        label: "Open Content Library",
        href: "/admin/marketing/content",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        <table className="w-full text-xs text-left text-gray-700 table-fixed">
          <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[9px]">
            <tr>
              <th className="py-1.5 px-1 w-[36%]">Content Item</th>
              <th className="py-1.5 px-1 w-[14%]">Type</th>
              <th className="py-1.5 px-1 w-[18%]">Status</th>
              <th className="py-1.5 px-1 w-[22%]">Placement</th>
              <th className="py-1.5 px-1 text-right w-[10%] font-mono">Ver</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-[11px]">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1 font-semibold text-gray-900 truncate" title={item.name}>
                  {item.name}
                </td>
                <td className="py-1.5 px-1 text-gray-500 truncate">
                  {item.type}
                </td>
                <td className="py-1.5 px-1">
                  <MarketingStatusChip status={item.status} className="text-[8px] px-1.5 py-0.2" />
                </td>
                <td className="py-1.5 px-1 text-gray-700 text-[10.5px] truncate" title={item.placement}>
                  {item.placement}
                </td>
                <td className="py-1.5 px-1 text-right font-mono text-gray-500 text-[10px]">
                  {item.versionCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
