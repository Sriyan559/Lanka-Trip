"use client";

import React from "react";
import { CampaignKpiItem } from "@/data/campaignManagement.mock";

export function CampaignKpiGrid({ kpis }: { kpis: CampaignKpiItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-white border border-gray-200/80 rounded-xl p-2.5 sm:p-3 shadow-2xs flex flex-col justify-between min-h-[82px] transition-all hover:border-gray-300"
        >
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight truncate">
            {kpi.label}
          </span>
          <div className="my-1">
            <span
              className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                kpi.valueColor || "text-gray-900"
              }`}
            >
              {kpi.value}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-gray-500 truncate">
            {kpi.subtext}
          </span>
        </div>
      ))}
    </div>
  );
}
