"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { MarketingAuditItem } from "@/data/marketingCommandCenter.mock";
import { Activity } from "lucide-react";

export function RecentMarketingActivity({
  activities = [],
}: {
  activities: MarketingAuditItem[];
}) {
  return (
    <MarketingSectionCard
      title="Recent Marketing Activity"
      subtitle="Audit log of recent system events, campaign syncs & governance approvals"
      footerLink={{
        label: "View Full Audit",
        href: "/admin/marketing/reports-audit",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-2.5 rounded-lg bg-gray-50/70 border border-gray-100 flex flex-col justify-between hover:bg-gray-100/70 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 mb-1">
                <Activity className="w-3 h-3 text-[#800020]" />
                <span>{act.timestamp}</span>
              </div>
              <p className="font-semibold text-gray-900 leading-snug">
                {act.action}
              </p>
            </div>

            <div className="mt-2 pt-1 border-t border-gray-200/50 flex items-center justify-between text-[10px] text-gray-500 font-medium">
              <span>Actor: {act.actor}</span>
              {act.source && <span className="text-gray-400">({act.source})</span>}
            </div>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
