"use client";

import React from "react";
import { PaidMediaKpiItem } from "@/data/marketingPaidMedia.mock";

interface PaidMediaKpiStripProps {
  kpis: PaidMediaKpiItem[];
}

export function PaidMediaKpiStrip({ kpis }: PaidMediaKpiStripProps) {
  const getColorClasses = (variant: PaidMediaKpiItem["variant"]) => {
    switch (variant) {
      case "green":
        return "text-emerald-600 font-bold";
      case "red":
        return "text-rose-600 font-bold";
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
          <div>
            <div className="flex items-baseline justify-between">
              <span className={`text-xl sm:text-2xl tracking-tight ${getColorClasses(kpi.variant)}`}>
                {kpi.value}
              </span>
            </div>
            {(kpi.trend || kpi.subtext) && (
              <div className="mt-0.5 text-[10px] font-medium text-gray-500 flex items-center gap-1">
                {kpi.trend && (
                  <span className={kpi.variant === "red" ? "text-rose-600" : "text-emerald-600"}>
                    ↗ {kpi.trend}
                  </span>
                )}
                {kpi.subtext && <span className="text-gray-600 font-semibold">{kpi.subtext}</span>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
