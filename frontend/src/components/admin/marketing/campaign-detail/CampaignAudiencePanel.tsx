"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { AudienceData } from "@/data/campaignDetail.mock";

export function CampaignAudiencePanel({
  audience,
}: {
  audience: AudienceData;
}) {
  return (
    <MarketingSectionCard
      title="Audience"
      footerLink={{
        label: "Open Audience Details",
        href: "/admin/marketing/audiences",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-2 font-sans">
        {/* Top metrics bar */}
        <div className="grid grid-cols-6 gap-1 text-center bg-gray-50/80 p-1.5 rounded-lg border border-gray-100 text-[10px]">
          <div>
            <span className="text-gray-400 block text-[9px]">Total</span>
            <span className="font-bold text-gray-900 text-xs">{audience.total}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Reach</span>
            <span className="font-bold text-gray-900 text-xs">{audience.reach}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">New</span>
            <span className="font-bold text-gray-900 text-xs">{audience.new}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Overlap</span>
            <span className="font-bold text-gray-900 text-xs">{audience.overlap}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Frequency</span>
            <span className="font-bold text-gray-900 text-xs">{audience.frequency}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">New Cust.</span>
            <span className="font-bold text-emerald-700 text-xs">{audience.newCustomers}</span>
          </div>
        </div>

        {/* Audience Funnel & Side Details */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_130px] gap-2 items-center">
          {/* Funnel chart steps */}
          <div className="flex flex-col gap-1 w-full">
            {audience.funnel.map((item, idx) => (
              <div key={item.stage} className="flex items-center gap-2 text-[10px]">
                <div
                  className="h-4 rounded-md flex items-center justify-between px-2 text-white font-bold transition-all shadow-2xs"
                  style={{
                    width: `${Math.max(item.percentage, 25)}%`,
                    backgroundColor:
                      idx === 0
                        ? "#1e293b"
                        : idx === 1
                        ? "#334155"
                        : idx === 2
                        ? "#475569"
                        : idx === 3
                        ? "#059669"
                        : "#047857",
                  }}
                >
                  <span className="truncate">{item.stage}</span>
                  <span className="text-[9px] font-mono">{item.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Side Details */}
          <div className="flex flex-col gap-1.5 border-l border-gray-100 pl-2 text-[10px]">
            <div>
              <span className="text-gray-400 block text-[9px]">Top Segment</span>
              <span className="font-bold text-gray-900 leading-tight">{audience.topSegment}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px]">Primary Persona</span>
              <span className="font-semibold text-gray-800 leading-tight">{audience.primaryPersona}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px]">Location / Device</span>
              <span className="font-medium text-gray-700 leading-tight">{audience.locationFocus}</span>
            </div>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
