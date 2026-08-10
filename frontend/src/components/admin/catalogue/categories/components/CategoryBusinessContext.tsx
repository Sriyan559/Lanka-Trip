"use client";

import React from "react";
import { Lock, RefreshCw } from "lucide-react";

interface CategoryBusinessContextProps {
  lastSyncedTime: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const CategoryBusinessContext: React.FC<CategoryBusinessContextProps> = ({
  lastSyncedTime,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-[11px] shadow-2xs mb-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-700">
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Tenant:</span>{" "}
          <span className="font-bold text-amber-700">Unavailable in schema</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Ecosystem:</span>{" "}
          <span className="font-bold text-gray-800">Catalogue database</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Business Unit:</span>{" "}
          <span className="font-bold text-amber-700">Unavailable</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Sales Channels:</span>{" "}
          <span className="font-bold text-amber-700">Unavailable</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Region:</span>{" "}
          <span className="font-bold text-amber-700">Unavailable</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Currency:</span>{" "}
          <span className="font-bold text-amber-700">Not applicable</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="font-bold text-sky-700">30s polling</span>
          </div>
          <span className="text-gray-400 text-[10.5px]">Last synced: {lastSyncedTime}</span>
          <button
            onClick={onRefresh}
            title="Refresh category business context"
            className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin text-[#741d35]" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};
