"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { HEALTH_SCORECARD } from "@/data/catalogue.mock";

export const CatalogueHealthScorecard: React.FC = () => {
  return (
    <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Catalogue Health Scorecard
        </h2>
        <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
          <span>View health insights</span>
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {HEALTH_SCORECARD.map((item) => {
          const barColor =
            item.percentage >= 90
              ? "bg-emerald-500"
              : item.percentage >= 85
              ? "bg-emerald-400"
              : "bg-amber-400";

          return (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-[10.5px] font-medium text-gray-500 line-clamp-1">
                {item.label}
              </span>
              <span className="text-sm font-extrabold text-gray-900">
                {item.percentage}%
              </span>
              <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden mt-0.5">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
