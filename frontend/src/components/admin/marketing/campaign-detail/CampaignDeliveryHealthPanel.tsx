"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { DeliveryHealthData } from "@/data/campaignDetail.mock";

export function CampaignDeliveryHealthPanel({
  health,
}: {
  health: DeliveryHealthData;
}) {
  return (
    <MarketingSectionCard
      title="Delivery & Integration Health"
      footerLink={{
        label: "View Integration Details",
        href: "/admin/marketing/governance",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-2 font-sans text-xs">
        {/* Systems progress bars */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {health.systems.map((sys) => (
            <div key={sys.name} className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-[10.5px]">
                <span className="text-gray-700 font-medium truncate">{sys.name}</span>
                <span className="font-bold text-emerald-700 font-mono text-[10px]">{sys.healthPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${sys.healthPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Sync Metadata */}
        <div className="flex justify-between items-center text-[10.5px] border-t border-gray-100 pt-2 mt-1 text-gray-600">
          <div>
            <span className="text-gray-400 block text-[9px]">Last Sync</span>
            <span className="font-semibold text-gray-900">{health.lastSync}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Failed Deliveries</span>
            <span className="font-bold text-emerald-700">{health.failedDeliveries}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block text-[9px]">Data Latency</span>
            <span className="font-semibold text-gray-900">{health.dataLatency}</span>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
