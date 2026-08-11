"use client";

import React from "react";
import { CampaignContextData } from "@/data/campaignDetail.mock";
import { RefreshCw } from "lucide-react";

export function CampaignDetailContextStrip({
  context,
  onRefresh,
}: {
  context: CampaignContextData;
  onRefresh?: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs font-sans text-xs flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Owner</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.owner}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Marketing Team</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.marketingTeam}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Business Unit</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.businessUnit}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Brand</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.brand}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Market</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.market}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Campaign Type</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.campaignType}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Campaign Period</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.campaignPeriod}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Status</span>
          <span className="font-bold text-emerald-700 text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {context.campaignStatus}
          </span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Governance</span>
          <span className="font-bold text-emerald-700 text-[11px]">{context.governanceStatus}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <span className="text-gray-400 text-[10px] block">Last Synced</span>
          <span className="font-medium text-gray-700 text-[10px]">{context.lastSynced}</span>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh Campaign Context"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
