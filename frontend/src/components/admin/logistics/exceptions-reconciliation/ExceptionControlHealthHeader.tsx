"use client";

import React from "react";
import { CircularProgress } from "../shared/CircularProgress";
import { TrendingUp } from "lucide-react";

export function ExceptionControlHealthHeader() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Logistics Control Health
        </h3>
        <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Good Control Performance</span>
        </p>
        <p className="text-[10.5px] text-gray-500 font-medium">
          +2 pts vs last 30 days | <span className="text-emerald-700 font-semibold">Trend: Improving</span>
        </p>
      </div>

      <CircularProgress
        value={91}
        label=""
        size={64}
        strokeWidth={6}
        color="#10b981"
      />
    </div>
  );
}
