"use client";

import React from "react";

interface MarketingSpendForecastCardProps {
  forecast: {
    forecastFinalSpend: string;
    forecastUtilizationPercent: number;
    expectedRemaining: string;
    forecastConfidencePercent: number;
    forecastVariancePercent: string;
    forecastStatus: string;
  };
}

export function MarketingSpendForecastCard({ forecast }: MarketingSpendForecastCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Marketing Spend Forecast
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Forecast Final Spend</span>
            <span className="font-bold text-gray-900">{forecast.forecastFinalSpend}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Forecast Utilization</span>
            <span className="font-bold text-gray-900">{forecast.forecastUtilizationPercent}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Expected Remaining</span>
            <span className="font-semibold text-emerald-700">{forecast.expectedRemaining}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Forecast Confidence</span>
            <span className="font-mono text-[11px] text-gray-700">{forecast.forecastConfidencePercent}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Forecast Variance</span>
            <span className="font-bold text-emerald-700">{forecast.forecastVariancePercent}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Forecast Status</span>
            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">
              {forecast.forecastStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
