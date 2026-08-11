"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { RecentActivityRecord } from "@/data/campaignManagement.mock";

export function RecentCampaignActivity({
  activities = [],
}: {
  activities: RecentActivityRecord[];
}) {
  return (
    <MarketingSectionCard
      title="Recent Campaign Activity"
      subtitle="Audit timeline of campaign creation, stage changes, approvals and budget updates"
      footerLink={{
        label: "View full audit trail",
        href: "/admin/marketing/reports-audit",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-400 font-semibold border-b border-gray-100">
            <tr>
              <th className="py-1 px-2 w-16">Time</th>
              <th className="py-1 px-2">Activity</th>
              <th className="py-1 px-2">User</th>
              <th className="py-1 px-2">System</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {activities.map((act) => (
              <tr key={act.id} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-2 font-mono text-gray-400 text-[10px]">
                  {act.time}
                </td>
                <td className="py-1.5 px-2 font-semibold text-gray-900">
                  {act.activity}
                </td>
                <td className="py-1.5 px-2 text-gray-600">{act.user}</td>
                <td className="py-1.5 px-2 text-gray-500">{act.system}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
