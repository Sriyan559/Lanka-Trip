"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { LinkedPromotionItem } from "@/data/campaignDetail.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function CampaignLinkedPromotionsPanel({
  promotions = [],
}: {
  promotions: LinkedPromotionItem[];
}) {
  return (
    <MarketingSectionCard
      title="Linked Marketplace Promotions"
      subtitle="Reference Only"
      footerLink={{
        label: "View All Promotions",
        href: "/admin/marketing/campaigns",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        {promotions.length === 0 ? (
          <div className="p-3 text-center text-xs text-gray-400 font-medium">
            No linked marketplace promotions.
          </div>
        ) : (
          <table className="w-full text-xs text-left text-gray-700 table-fixed">
            <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[9px]">
              <tr>
                <th className="py-1.5 px-1 w-[40%]">Promotion</th>
                <th className="py-1.5 px-1 w-[22%]">Marketplace</th>
                <th className="py-1.5 px-1 w-[18%]">Status</th>
                <th className="py-1.5 px-1 text-right w-[20%] font-mono">Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
              {promotions.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 px-1 font-semibold text-gray-900 truncate" title={p.promotion}>
                    {p.promotion}
                  </td>
                  <td className="py-1.5 px-1 text-gray-700 truncate">
                    {p.marketplace}
                  </td>
                  <td className="py-1.5 px-1">
                    <MarketingStatusChip status={p.status} className="text-[8px] px-1 py-0.2" />
                  </td>
                  <td className="py-1.5 px-1 text-right font-mono font-bold text-gray-900 text-[10px]">
                    {p.budget}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MarketingSectionCard>
  );
}
