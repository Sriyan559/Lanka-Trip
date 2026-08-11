"use client";

import React from "react";
import { CampaignOperationRow } from "@/data/marketingCommandCenter.mock";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import {
  PlayCircle,
  Calendar,
  Clock,
  FileEdit,
  PauseCircle,
  CheckCircle,
} from "lucide-react";

const STATUS_ICONS: Record<string, React.ElementType> = {
  active: PlayCircle,
  scheduled: Calendar,
  awaiting_approval: Clock,
  draft: FileEdit,
  paused: PauseCircle,
  completed: CheckCircle,
};

export function CampaignOperations({
  items,
}: {
  items: CampaignOperationRow[];
}) {
  return (
    <MarketingSectionCard
      title="Campaign Operations"
      subtitle="Lifecycle status overview"
      className="h-full"
    >
      <div className="flex flex-col gap-2 my-auto">
        {items.map((row) => {
          const IconComp = STATUS_ICONS[row.statusKey] || PlayCircle;
          return (
            <div
              key={row.statusKey}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50/70 hover:bg-gray-100/70 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <IconComp className="w-3.5 h-3.5 text-gray-500" />
                <span>{row.label}</span>
              </div>
              <span className="text-xs font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-2xs">
                {row.count}
              </span>
            </div>
          );
        })}
      </div>
    </MarketingSectionCard>
  );
}
