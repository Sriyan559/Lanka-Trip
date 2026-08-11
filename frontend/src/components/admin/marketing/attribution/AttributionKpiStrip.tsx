"use client";

import React from "react";
import { AttributionKpiItem } from "@/data/marketingAttribution.mock";
import {
  DollarSign,
  TrendingUp,
  Target,
  ShoppingBag,
  CheckCircle2,
  Users,
  PieChart,
  HeartPulse,
} from "lucide-react";

interface AttributionKpiStripProps {
  kpis: AttributionKpiItem[];
}

export function AttributionKpiStrip({ kpis }: AttributionKpiStripProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "spend":
        return <DollarSign className="w-4 h-4 text-rose-600 bg-rose-50 p-0.5 rounded" />;
      case "attributed_revenue":
        return <TrendingUp className="w-4 h-4 text-emerald-600 bg-emerald-50 p-0.5 rounded" />;
      case "roas":
        return <Target className="w-4 h-4 text-blue-600 bg-blue-50 p-0.5 rounded" />;
      case "influenced_orders":
        return <ShoppingBag className="w-4 h-4 text-orange-600 bg-orange-50 p-0.5 rounded" />;
      case "attributed_conversions":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 bg-emerald-50 p-0.5 rounded" />;
      case "avg_cac":
        return <Users className="w-4 h-4 text-rose-600 bg-rose-50 p-0.5 rounded" />;
      case "assisted_revenue":
        return <PieChart className="w-4 h-4 text-blue-600 bg-blue-50 p-0.5 rounded" />;
      case "analytics_health":
        return <HeartPulse className="w-4 h-4 text-emerald-600 bg-emerald-50 p-0.5 rounded" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-500 bg-gray-50 p-0.5 rounded" />;
    }
  };

  const getValueColor = (variant: AttributionKpiItem["variant"]) => {
    switch (variant) {
      case "green":
        return "text-emerald-600 font-bold";
      case "red":
        return "text-rose-600 font-bold";
      case "orange":
        return "text-orange-600 font-bold";
      case "amber":
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
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-gray-500 leading-tight">
              {kpi.label}
            </span>
            {getIcon(kpi.id)}
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className={`text-xl sm:text-2xl tracking-tight ${getValueColor(kpi.variant)}`}>
                {kpi.value}
              </span>
            </div>
            {kpi.subtext && (
              <div className="mt-0.5 text-[10px] font-medium text-gray-500">
                <span>{kpi.subtext}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
