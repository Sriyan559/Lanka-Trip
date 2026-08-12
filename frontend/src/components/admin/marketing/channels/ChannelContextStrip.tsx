"use client";

import React from "react";
import { ChannelContextData } from "@/data/marketingChannels.mock";
import { RefreshCw } from "lucide-react";

interface ChannelContextStripProps {
  context: ChannelContextData;
  onRefresh?: () => void;
}

export function ChannelContextStrip({
  context,
  onRefresh,
}: ChannelContextStripProps) {
  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-[11px] font-sans shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        {/* Left Data Attributes Group */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 divide-x divide-gray-200 text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-medium">Tenant:</span>
            <span className="font-semibold text-gray-900">{context.tenant || "SL Beauty"}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Ecosystem:</span>
            <span className="font-semibold text-gray-900">{context.ecosystem || "Beauty Marketplace"}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Business Unit:</span>
            <span className="font-semibold text-gray-900">{context.businessUnit || "All Business Units"}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Region:</span>
            <span className="font-semibold text-gray-900">{context.region || "Sri Lanka"}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Base Currency:</span>
            <span className="font-semibold text-gray-900">{context.baseCurrency || "LKR"}</span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Channel Scope:</span>
            <span className="font-semibold text-gray-900">{context.channelScope || "All Marketing Channels"}</span>
          </div>

          {/* Messaging Gateway Health */}
          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Messaging Gateway:</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {context.messagingGateway || "Healthy"}
            </span>
          </div>

          {/* Consent Sync Health */}
          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Consent Sync:</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {context.consentSync || "Healthy"}
            </span>
          </div>

          {/* Provider Sync Health */}
          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Provider Sync:</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {context.providerSync || "Healthy"}
            </span>
          </div>

          <div className="pl-3 flex items-center gap-1">
            <span className="text-gray-400 font-medium">Date Range:</span>
            <span className="font-semibold text-gray-900">{context.dateRange || "Last 30 Days"}</span>
          </div>
        </div>

        {/* Right Group: Completeness, Timestamp, Access & Refresh */}
        <div className="flex flex-wrap items-center gap-3 text-gray-600">
          {/* Data Completeness */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 font-medium">Data Completeness:</span>
            <span className="font-bold text-gray-900">{context.completenessPercent ?? 98}%</span>
            <div className="w-10 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${context.completenessPercent ?? 98}%` }}
              />
            </div>
          </div>

          {/* Last Synced */}
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-gray-400 font-medium">Last Synced:</span>
            <span>{context.lastSynced}</span>
          </div>

          {/* Access Scope */}
          <div className="text-gray-400 hidden lg:inline">
            <span>Access: {context.access || "Limited to assigned business context"}</span>
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
