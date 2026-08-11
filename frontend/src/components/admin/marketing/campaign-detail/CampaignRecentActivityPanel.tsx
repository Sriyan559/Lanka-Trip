"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { RecentActivityItem } from "@/data/campaignDetail.mock";

export function CampaignRecentActivityPanel({
  activities = [],
}: {
  activities: RecentActivityItem[];
}) {
  return (
    <MarketingSectionCard
      title="Recent Campaign Activity"
      footerLink={{
        label: "View All Activity",
        href: "/admin/marketing/reports-audit",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        {activities.length === 0 ? (
          <div className="p-3 text-center text-xs text-gray-400 font-medium">
            No recent campaign activity.
          </div>
        ) : (
          <table className="w-full text-xs text-left text-gray-700 table-fixed">
            <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[9px]">
              <tr>
                <th className="py-1.5 px-1 w-[55%]">Activity</th>
                <th className="py-1.5 px-1 w-[25%]">Actor / Source</th>
                <th className="py-1.5 px-1 text-right w-[20%] font-mono">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 px-1 font-semibold text-gray-900 truncate" title={act.activity}>
                    {act.activity}
                  </td>
                  <td className="py-1.5 px-1 text-gray-600 truncate">
                    {act.actor}
                  </td>
                  <td className="py-1.5 px-1 text-right font-mono text-gray-500 text-[10px] whitespace-nowrap">
                    {act.time}
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
