"use client";

import React from "react";
import Link from "next/link";
import { LinkedCampaignItem, LinkedJourneyItem } from "@/data/marketingContent.mock";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function ContentLinkedCampaignsPanel({
  campaigns = [],
}: {
  campaigns: LinkedCampaignItem[];
}) {
  return (
    <MarketingSectionCard title="6. Linked Campaigns" className="h-full">
      <div className="divide-y divide-gray-100 font-sans text-xs">
        {campaigns.map((c) => (
          <div key={c.id} className="py-1.5 flex items-center justify-between text-[10px]">
            <div className="flex flex-col min-w-0">
              <Link
                href={`/admin/marketing/campaigns/${c.id}`}
                className="font-bold text-[#800020] hover:underline truncate"
              >
                {c.name}
              </Link>
              <span className="text-[9px] text-gray-500">{c.role}</span>
            </div>

            <span className="text-[8px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded shrink-0">
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}

export function ContentLinkedJourneysPanel({
  journeys = [],
}: {
  journeys: LinkedJourneyItem[];
}) {
  return (
    <MarketingSectionCard
      title="7. Linked Journeys"
      footerLink={{
        label: "View All Journeys →",
        href: "/admin/marketing/journeys",
      }}
      className="h-full"
    >
      <div className="divide-y divide-gray-100 font-sans text-xs">
        {journeys.map((j) => (
          <div key={j.id} className="py-1.5 flex items-center justify-between text-[10px]">
            <div className="flex flex-col min-w-0">
              <Link
                href={`/admin/marketing/journeys/${j.id}`}
                className="font-bold text-[#800020] hover:underline truncate"
              >
                {j.name}
              </Link>
              <span className="text-[9px] text-gray-500">{j.role}</span>
            </div>

            <span className="text-[8px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded shrink-0">
              {j.status}
            </span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
