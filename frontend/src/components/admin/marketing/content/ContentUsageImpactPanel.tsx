"use client";

import React from "react";
import { ContentActivityItem, ContentAuditItem } from "@/data/marketingContent.mock";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { Plus } from "lucide-react";

export function ContentUsageImpactPanel() {
  return (
    <MarketingSectionCard title="14. Usage Impact" className="h-full">
      <div className="flex flex-col justify-between font-sans text-xs h-full gap-2">
        <p className="text-[10px] text-gray-600 font-medium leading-relaxed">
          This content is currently referenced by <span className="font-bold text-gray-900">2 active campaigns</span>,{" "}
          <span className="font-bold text-gray-900">1 running journey</span> and{" "}
          <span className="font-bold text-gray-900">3 active placements</span>. Changing the approved version may require revalidation and campaign synchronization.
        </p>

        <div>
          <span className="text-[8.5px] font-bold text-gray-400 uppercase block mb-1">RECOMMENDED ACTION</span>
          <button className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[10.5px] font-bold text-[#800020] bg-white border border-[#800020] hover:bg-[#800020]/5 rounded-lg transition-colors shadow-2xs h-7">
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Version</span>
          </button>
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function ContentRecentActivityPanel({
  activity = [],
}: {
  activity: ContentActivityItem[];
}) {
  return (
    <MarketingSectionCard
      title="15. Recent Content Activity"
      footerLink={{
        label: "View All Activity →",
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
            <span className="text-gray-500 font-mono text-[9px] shrink-0 ml-1">{item.time}</span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}

export function ContentAuditPanel({
  audit = [],
}: {
  audit: ContentAuditItem[];
}) {
  return (
    <MarketingSectionCard
      title="16. Content Audit"
      footerLink={{
        label: "View Audit Trail →",
        href: "/admin/marketing/reports-audit",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-1 text-xs font-sans">
        {audit.map((item) => (
          <div key={item.label} className="flex justify-between items-center text-[10px]">
            <span className="text-gray-600 font-medium">{item.label}</span>
            <span className="font-mono font-bold text-gray-900 text-[10.5px]">{item.count}</span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
