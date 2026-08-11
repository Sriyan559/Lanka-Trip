"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function JourneyLinkedCampaignsPanel({
  campaigns = [],
}: {
  campaigns: Array<{ id: string; name: string; status: string }>;
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
                <td className="py-1.5 px-1 font-bold text-gray-900 truncate" title={c.name}>
                  {c.name}
                </td>
                <td className="py-1.5 px-1 text-right w-16">
                  <MarketingStatusChip status={c.status} className="text-[8px] px-1.5 py-0.2" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}

export function JourneyLinkedAudiencesPanel({
  audiences = [],
}: {
  audiences: Array<{ id: string; name: string; status: string }>;
}) {
  return (
    <MarketingSectionCard
      title="Linked Audiences"
      footerLink={{
        label: "View All Audiences",
        href: "/admin/marketing/audiences",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        <table className="w-full text-xs text-left text-gray-700 table-fixed">
          <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
            {audiences.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1 font-bold text-gray-900 truncate" title={a.name}>
                  {a.name}
                </td>
                <td className="py-1.5 px-1 text-right w-16">
                  <MarketingStatusChip status={a.status} className="text-[8px] px-1.5 py-0.2" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}

export function JourneyRecentActivityPanel({
  activity = [],
}: {
  activity: Array<{ date: string; time: string; activity: string; user: string }>;
}) {
  return (
    <MarketingSectionCard
      title="Recent Journey Activity"
      footerLink={{
        label: "View Full Activity",
        href: "/admin/marketing/reports-audit",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-1 text-xs font-sans">
        {activity.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#800020] shrink-0" />
              <span className="font-bold text-gray-900 truncate">{item.activity}</span>
            </div>
            <span className="text-gray-500 font-mono text-[9px] shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}

export function JourneyVersionPanel({
  version,
}: {
  version: {
    liveVersion: string;
    lastPublished: string;
    draftVersion: string;
    lastEdited: string;
    createdBy: string;
    lastEditedBy: string;
  };
}) {
  return (
    <MarketingSectionCard
      title="Journey Version"
      footerLink={{
        label: "View All Versions",
        href: "/admin/marketing/journeys",
      }}
    >
      <div className="flex flex-col gap-1.5 font-sans text-xs">
        {/* Live Version Box (Green Tint) */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-md p-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[8.5px] font-bold text-emerald-800">Current Live Version</span>
            <span className="text-[10px] font-mono font-extrabold text-gray-900">{version.liveVersion}</span>
          </div>
          <div className="flex justify-between items-center mt-0.5">
            <span className="text-[8px] text-gray-500 font-medium">Last Published</span>
            <span className="text-[8.5px] font-mono font-bold text-gray-700">{version.lastPublished}</span>
          </div>
        </div>

        {/* Draft Revision Box (Blue Tint) */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-md p-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[8.5px] font-bold text-blue-800">Draft Revision</span>
            <span className="text-[10px] font-mono font-extrabold text-blue-900">{version.draftVersion}</span>
          </div>
          <div className="flex justify-between items-center mt-0.5">
            <span className="text-[8px] text-gray-500 font-medium">Last Edited</span>
            <span className="text-[8.5px] font-mono font-bold text-gray-700">{version.lastEdited}</span>
          </div>
        </div>

        {/* Metadata Rows */}
        <div className="flex flex-col gap-0.5 pt-0.5">
          <div className="flex justify-between items-center">
            <span className="text-[8.5px] text-gray-500">Created By</span>
            <span className="text-[9px] font-bold text-gray-900">{version.createdBy}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[8.5px] text-gray-500">Last Edited By</span>
            <span className="text-[9px] font-bold text-gray-900">{version.lastEditedBy}</span>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
