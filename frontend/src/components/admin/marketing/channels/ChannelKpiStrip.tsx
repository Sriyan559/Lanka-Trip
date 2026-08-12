"use client";

import React from "react";
import { ChannelKpiItem } from "@/data/marketingChannels.mock";

interface ChannelKpiStripProps {
  kpis: ChannelKpiItem[];
}

export function ChannelKpiStrip({ kpis }: ChannelKpiStripProps) {
  const getColorClasses = (variant: ChannelKpiItem["variant"]) => {
    switch (variant) {
      case "green":
        return "text-emerald-600 font-bold";
      case "red":
        return "text-rose-600 font-bold";
      case "orange":
        return "text-amber-600 font-bold";
      case "blue":
      default:
        return "text-blue-600 font-bold";
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2.5 w-full">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between"
        >
          <span className="text-[11px] font-medium text-gray-500 leading-tight block mb-1">
            {kpi.label}
          </span>
          <div className="flex items-baseline justify-between">
            <span className={`text-xl sm:text-2xl tracking-tight ${getColorClasses(kpi.variant)}`}>
              {kpi.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
