"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { SparklineChart } from "./charts/SparklineChart";
import { KpiMetricData } from "@/data/analytics/executivePerformanceData";

interface KpiCardProps {
  data: KpiMetricData;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

export function KpiCard({ data, isLoading = false, className = "", onClick }: KpiCardProps) {
  if (isLoading) {
    return (
      <div className={`an02-kpi-card loading bg-white p-3.5 rounded-lg border border-slate-200 animate-pulse ${className}`}>
        <div className="h-3 w-24 bg-slate-200 rounded mb-2" />
        <div className="h-7 w-32 bg-slate-200 rounded mb-3" />
        <div className="h-3 w-40 bg-slate-100 rounded" />
      </div>
    );
  }

  const {
    number,
    title,
    mainValue,
    trendPercentage,
    trendDirection,
    isPositive,
    trendSuffix = "%",
    comparisonLabel,
    sparklineData,
    secondaryMetric,
  } = data;

  const isTrendUp = trendDirection === "up";
  const trendBgColor = isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50";

  return (
    <div
      onClick={onClick}
      className={`an02-kpi-card bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Primary Metric Section */}
      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
          <span className="truncate flex items-center gap-1">
            {number && <span className="text-slate-400 font-semibold">{number}</span>}
            <span>{title}</span>
          </span>
        </div>

        {/* Main Metric + Sparkline Row */}
        <div className="flex items-center justify-between gap-2 my-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
              {mainValue}
            </span>

            {/* Trend Badge */}
            <span
              className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[10px] font-bold ${trendBgColor}`}
            >
              {isTrendUp ? <ArrowUp size={10} className="stroke-[3]" /> : <ArrowDown size={10} className="stroke-[3]" />}
              <span>
                {trendPercentage > 0 ? `${trendPercentage}` : Math.abs(trendPercentage)}
                {trendSuffix}
              </span>
            </span>
          </div>

          {/* Sparkline Graph */}
          {sparklineData && sparklineData.length > 0 && (
            <div className="sparkline-wrapper shrink-0">
              <SparklineChart
                data={sparklineData}
                color={isPositive ? "#059669" : "#dc2626"}
                width={70}
                height={24}
                strokeWidth={1.8}
              />
            </div>
          )}
        </div>
      </div>

      {/* Secondary Metric Section (If Paired Metric Card) */}
      {secondaryMetric ? (
        <div className="mt-2 pt-2 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-700 mb-0.5">{secondaryMetric.label}</div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                {secondaryMetric.value}
              </span>

              {secondaryMetric.trendPercentage !== undefined && (
                <span
                  className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[10px] font-bold ${
                    secondaryMetric.isPositive !== false
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-rose-600 bg-rose-50"
                  }`}
                >
                  {secondaryMetric.trendDirection === "down" || secondaryMetric.isPositive === false ? (
                    <ArrowDown size={10} className="stroke-[3]" />
                  ) : (
                    <ArrowUp size={10} className="stroke-[3]" />
                  )}
                  <span>
                    {secondaryMetric.trendPercentage > 0
                      ? `${secondaryMetric.trendPercentage}%`
                      : `${Math.abs(secondaryMetric.trendPercentage)}%`}
                  </span>
                </span>
              )}
            </div>

            {/* Secondary Sparkline if available */}
            {secondaryMetric.sparklineData && secondaryMetric.sparklineData.length > 0 && (
              <div className="sparkline-wrapper shrink-0">
                <SparklineChart
                  data={secondaryMetric.sparklineData}
                  color={secondaryMetric.isPositive !== false ? "#059669" : "#dc2626"}
                  width={70}
                  height={24}
                  strokeWidth={1.8}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-2 pt-1.5 text-[10px] text-slate-400 font-medium border-t border-slate-100">
          {comparisonLabel || "vs. Previous 30 Days"}
        </div>
      )}
    </div>
  );
}
