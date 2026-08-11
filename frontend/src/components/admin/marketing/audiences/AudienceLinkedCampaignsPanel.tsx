"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function AudienceLinkedCampaignsPanel({
  campaigns = [],
}: {
  campaigns: Array<{ id: string; name: string; status: string; role: string; reach: string }>;
}) {
  return (
    <MarketingSectionCard
      title="Linked Campaigns"
      footerLink={{
        label: "View All Campaigns",
        href: "/admin/marketing/campaigns",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        <table className="w-full text-xs text-left text-gray-700 table-fixed">
          <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1 font-semibold text-gray-900 truncate" title={c.name}>
                  {c.name}
                </td>
                <td className="py-1.5 px-1 w-16">
                  <MarketingStatusChip status={c.status} className="text-[8px] px-1 py-0.2" />
                </td>
                <td className="py-1.5 px-1 text-gray-500 text-[9.5px] truncate">
                  {c.role}
                </td>
                <td className="py-1.5 px-1 text-right font-mono font-bold text-gray-900 text-[10px] w-14">
                  {c.reach}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}

export function AudienceLinkedJourneysPanel({
  journeys = [],
}: {
  journeys: Array<{ id: string; name: string; status: string; ruleType: string; contacts: string }>;
}) {
  return (
    <MarketingSectionCard
      title="Linked Journeys"
      footerLink={{
        label: "View All Journeys",
        href: "/admin/marketing/journeys",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        <table className="w-full text-xs text-left text-gray-700 table-fixed">
          <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
            {journeys.map((j) => (
              <tr key={j.id} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1 font-semibold text-gray-900 truncate" title={j.name}>
                  {j.name}
                </td>
                <td className="py-1.5 px-1 w-16">
                  <MarketingStatusChip status={j.status} className="text-[8px] px-1 py-0.2" />
                </td>
                <td className="py-1.5 px-1 text-gray-500 text-[9.5px] truncate">
                  {j.ruleType}
                </td>
                <td className="py-1.5 px-1 text-right font-mono font-bold text-gray-900 text-[10px] w-16">
                  {j.contacts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
