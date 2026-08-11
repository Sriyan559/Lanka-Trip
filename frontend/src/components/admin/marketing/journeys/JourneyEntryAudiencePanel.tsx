"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function JourneyEntryAudiencePanel({
  audience,
}: {
  audience: {
    name: string;
    activeInJourney: string;
    segmentation: string;
    audienceSize: string;
  };
}) {
  return (
    <MarketingSectionCard
      title="Entry Audience"
      footerLink={{
        label: "Open Audience",
        href: "/admin/marketing/audiences",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-2 font-sans text-xs">
        <div>
          <span className="font-extrabold text-gray-900 text-sm block">{audience.name}</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
          <span className="text-gray-500 font-medium">Active in Journey</span>
          <span className="font-mono font-bold text-gray-900 text-sm">{audience.activeInJourney}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Segmentation</span>
          <span className="font-semibold text-indigo-700">{audience.segmentation}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Audience Size</span>
          <span className="font-mono font-bold text-gray-700">{audience.audienceSize}</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function JourneyEntryTriggerPanel({
  trigger,
}: {
  trigger: {
    event: string;
    condition: string;
    frequency: string;
    timezone: string;
    ignoreInitial: string;
    status: string;
  };
}) {
  return (
    <MarketingSectionCard title="Entry Trigger" className="h-full">
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-sans">
        <div>
          <span className="text-gray-400 text-[9px] block">Trigger Event</span>
          <span className="font-extrabold text-gray-900">{trigger.event}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Condition</span>
          <span className="text-gray-700 text-[10px] truncate block">{trigger.condition}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Frequency</span>
          <span className="font-semibold text-gray-800 text-[10.5px]">{trigger.frequency}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Timezone</span>
          <span className="font-mono text-gray-700 text-[9.5px] truncate block">{trigger.timezone}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Ignore Initial</span>
          <span className="font-mono font-bold text-gray-900">{trigger.ignoreInitial}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Status</span>
          <span className="font-bold text-emerald-700 text-[10.5px]">{trigger.status}</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
