"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { RelatedJourneyItem } from "@/data/campaignDetail.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function CampaignRelatedJourneysPanel({
  journeys = [],
}: {
  journeys: RelatedJourneyItem[];
}) {
  return (
    <MarketingSectionCard
      title="Related Journeys & Automations"
      footerLink={{
        label: "View All Journeys",
        href: "/admin/marketing/journeys",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        {journeys.length === 0 ? (
          <div className="p-3 text-center text-xs text-gray-400 font-medium">
            No linked journeys found.
          </div>
        ) : (
          <table className="w-full text-xs text-left text-gray-700 table-fixed">
            <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[9px]">
              <tr>
                <th className="py-1.5 px-1 w-[40%]">Journey / Automation</th>
                <th className="py-1.5 px-1 w-[16%]">Type</th>
                <th className="py-1.5 px-1 w-[16%]">Status</th>
                <th className="py-1.5 px-1 text-right w-[28%] font-mono">Contacts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
              {journeys.map((j) => (
                <tr key={j.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 px-1 font-semibold text-gray-900 truncate" title={j.name}>
                    {j.name}
                  </td>
                  <td className="py-1.5 px-1 text-gray-500 text-[10px]">
                    {j.type}
                  </td>
                  <td className="py-1.5 px-1">
                    <MarketingStatusChip status={j.status} className="text-[8px] px-1 py-0.2" />
                  </td>
                  <td className="py-1.5 px-1 text-right font-mono font-bold text-gray-900 text-[10px]">
                    {j.contacts}
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
