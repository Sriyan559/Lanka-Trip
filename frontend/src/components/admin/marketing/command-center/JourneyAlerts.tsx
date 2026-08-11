"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { JourneyAlertItem } from "@/data/marketingCommandCenter.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import Link from "next/link";

export function JourneyAlerts({ alerts = [] }: { alerts: JourneyAlertItem[] }) {
  return (
    <MarketingSectionCard
      title="Journeys Alerts"
      subtitle="Priority operational notifications for active campaigns & journeys"
    >
      <div className="space-y-1.5">
        {alerts.map((alt) => (
          <div
            key={alt.id}
            className="flex items-center justify-between gap-1.5 p-1.5 rounded-lg bg-gray-50/70 border border-gray-100 hover:bg-gray-100/70 transition-colors"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <MarketingStatusChip status={alt.severity} className="shrink-0 text-[10px]" />
              <span className="text-[11px] font-semibold text-gray-900 line-clamp-1">
                {alt.message}
              </span>
            </div>

            <Link
              href={alt.route}
              className="text-[10px] font-bold text-[#800020] hover:underline shrink-0 pl-1"
            >
              {alt.actionText}
            </Link>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
