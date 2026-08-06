"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface BrandBusinessContextProps {
  lastSynced: string;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const BrandBusinessContext: React.FC<BrandBusinessContextProps> = ({
  lastSynced,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex flex-wrap items-center justify-between text-[11px] text-gray-600 gap-3">
      {/* Scope Metadata Strip */}
      <div className="flex flex-wrap items-center gap-6 font-medium">
        <div>
          <span className="text-gray-400 font-normal">Tenant: </span>
          <span className="font-bold text-gray-800">SL Beauty</span>
        </div>
        <div>
          <span className="text-gray-400 font-normal">Ecosystem: </span>
          <span className="font-bold text-gray-800">Beauty Marketplace</span>
        </div>
        <div>
          <span className="text-gray-400 font-normal">Business Unit: </span>
          <span className="font-bold text-gray-800">All Business Units</span>
        </div>
        <div>
          <span className="text-gray-400 font-normal">Sales Channels: </span>
          <span className="font-bold text-gray-800">All Channels</span>
        </div>
        <div>
          <span className="text-gray-400 font-normal">Region: </span>
          <span className="font-bold text-gray-800">Sri Lanka</span>
        </div>
        <div>
          <span className="text-gray-400 font-normal">Currency: </span>
          <span className="font-bold text-gray-800">LKR</span>
        </div>
      </div>

      {/* Sync Status & Refresh */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Data</span>
        </div>
        <div className="text-gray-400 font-normal">
          Last synced: <span className="font-semibold text-gray-700">{lastSynced}</span>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw size={12} className={isRefreshing ? "animate-spin text-[#741d35]" : ""} />
        </button>
      </div>
    </div>
  );
};
