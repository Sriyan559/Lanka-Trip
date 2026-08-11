"use client";

import React from "react";
import { MarketingContext } from "@/data/marketingCommandCenter.mock";
import { RefreshCw } from "lucide-react";

interface MarketingContextStripProps {
  context: MarketingContext;
  onRefresh?: () => void;
}

export function MarketingContextStrip({
  context,
  onRefresh,
}: MarketingContextStripProps) {
  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-[11px] font-sans shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        {/* Left items group */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 divide-x divide-gray-200 text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-medium">Tenant:</span>
            <span className="font-semibold text-gray-900">{context.tenant}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Ecosystem:</span>
            <span className="font-semibold text-gray-900">{context.ecosystem}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Business Unit:</span>
            <span className="font-semibold text-gray-900">{context.businessUnit}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Sales Channels:</span>
            <span className="font-semibold text-gray-900">{context.salesChannels}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Region:</span>
            <span className="font-semibold text-gray-900">{context.region}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Base Currency:</span>
            <span className="font-semibold text-gray-900">{context.baseCurrency}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Marketing Scope:</span>
            <span className="font-semibold text-gray-900">{context.marketingScope}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Campaign Period:</span>
            <span className="font-semibold text-gray-900">{context.campaignPeriod}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Date Range:</span>
            <span className="font-semibold text-gray-900">{context.dateRange}</span>
          </div>
        </div>

        {/* Right status group */}
        <div className="flex flex-wrap items-center gap-3 text-gray-600">
          {/* Live Data */}
          <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Data</span>
          </div>

          {/* Data Completeness */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 font-medium">Data Completeness:</span>
            <span className="font-bold text-gray-900">{context.dataCompleteness}%</span>
            <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${context.dataCompleteness}%` }}
              />
            </div>
          </div>

          {/* Last Synced */}
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-gray-400 font-medium">Last Synced:</span>
            <span>{context.lastSynced}</span>
          </div>

          {/* Campaign Period State */}
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-medium">Period State:</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {context.campaignPeriodState}
            </span>
          </div>

          {/* Access */}
          <div className="text-gray-400 hidden lg:inline">
            <span>Access: {context.accessScope}</span>
          </div>

          {/* Refresh Action */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="text-[#800020] hover:text-[#66001a] font-semibold text-[11px] underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
