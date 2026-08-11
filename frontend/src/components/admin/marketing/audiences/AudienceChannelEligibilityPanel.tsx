"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function AudienceChannelEligibilityPanel({
  eligibility = [],
}: {
  eligibility: Array<{ channel: string; eligible: string; successRate: string; matchRate: string }>;
}) {
  return (
    <MarketingSectionCard
      title="Channel Eligibility"
      footerLink={{
        label: "View Channel Details",
        href: "/admin/marketing/channels",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        <table className="w-full text-xs text-left text-gray-700 table-fixed">
          <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[8.5px]">
            <tr>
              <th className="py-1 px-1 w-[35%]">Channel</th>
              <th className="py-1 px-1 w-[25%]">Eligible</th>
              <th className="py-1 px-1 w-[20%]">Success Rate</th>
              <th className="py-1 px-1 text-right w-[20%] font-mono">Match Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
            {eligibility.map((item) => (
              <tr key={item.channel} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1 font-semibold text-gray-900 truncate">
                  {item.channel}
                </td>
                <td className="py-1.5 px-1 font-mono text-gray-800">
                  {item.eligible}
                </td>
                <td className="py-1.5 px-1 font-mono text-gray-700">
                  {item.successRate}
                </td>
                <td className="py-1.5 px-1 text-right font-mono font-bold text-emerald-700">
                  {item.matchRate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
