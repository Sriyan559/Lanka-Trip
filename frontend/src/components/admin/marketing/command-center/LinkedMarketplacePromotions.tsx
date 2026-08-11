"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { LinkedPromotionItem } from "@/data/marketingCommandCenter.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function LinkedMarketplacePromotions({
  promotions = [],
}: {
  promotions: LinkedPromotionItem[];
}) {
  return (
    <MarketingSectionCard
      title="Linked Marketplace Promotions"
      subtitle="Approved marketplace offers referenced by marketing campaigns."
      footerLink={{
        label: "View Marketplace Promotions",
        href: "/admin/marketplace/promotions",
      }}
    >
      <div className="w-full overflow-hidden">
        <table className="w-full text-[10px] text-left text-gray-700 table-fixed">
          <thead className="bg-gray-50 text-gray-400 font-semibold border-b border-gray-100">
            <tr>
              <th className="py-1 px-1.5 w-[38%] truncate">Campaign</th>
              <th className="py-1 px-1.5 w-[42%] truncate">Linked Promotion</th>
              <th className="py-1 px-1.5 w-[20%] text-right truncate">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {promotions.map((p, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1.5 font-semibold text-gray-900 truncate">
                  {p.campaign}
                </td>
                <td className="py-1.5 px-1.5 text-gray-600 truncate">
                  {p.promotion}
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
