"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { UpcomingActivityItem } from "@/data/marketingCommandCenter.mock";

export function UpcomingActivity({
  activities = [],
}: {
  activities: UpcomingActivityItem[];
}) {
  return (
    <MarketingSectionCard
      title="Upcoming Activity"
      subtitle="Scheduled campaign milestones & governance reviews"
      footerLink={{
        label: "View Marketing Calendar",
        href: "/admin/marketing/campaigns",
      }}
    >
      <div className="space-y-1.5">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50/80 transition-colors"
          >
            {/* Date block */}
            <div className="w-10 h-8 rounded bg-rose-50 border border-rose-100/90 flex flex-col items-center justify-center text-[#800020] shrink-0 leading-tight">
              <span className="text-[10px] font-extrabold uppercase">
                {act.dayMonth}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h5 className="text-[11px] font-bold text-gray-900 leading-tight line-clamp-1">
                {act.title}
              </h5>
              <p className="text-[10px] text-gray-500 truncate">{act.detail}</p>
            </div>

            {/* Time Tag */}
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 shrink-0">
              {act.timeTag}
            </span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
