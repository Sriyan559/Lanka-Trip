"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { LinkedPromotionRecord } from "@/data/campaignManagement.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function CampaignLinkedPromotions({
  promotions = [],
}: {
  promotions: LinkedPromotionRecord[];
}) {
  return (
    <MarketingSectionCard
      title={
        <div className="flex items-center gap-1.5">
          <span>Linked Marketplace Promotions</span>
          <span className="text-[10px] text-gray-400 font-semibold">(Reference Only)</span>
        </div>
      }
      subtitle="Commercial promotion rules and discount configurations are managed in Marketplace."
      footerLink={{
        label: "Go to Marketplace",
        href: "/admin/marketplace/promotions",
      }}
      className="h-full"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-400 font-semibold border-b border-gray-100">
            <tr>
              <th className="py-1 px-1.5">Campaign</th>
              <th className="py-1 px-1.5">Promotion</th>
              <th className="py-1 px-1.5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {promotions.map((p, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1.5 font-semibold text-gray-900 truncate">
                  {p.campaignName}
                </td>
                <td className="py-1.5 px-1.5 text-gray-600 truncate">
                  {p.promotionName}
                </td>
                <td className="py-1.5 px-1.5 text-right">
                  <MarketingStatusChip status={p.status} className="text-[9px] px-1.5 py-0" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
