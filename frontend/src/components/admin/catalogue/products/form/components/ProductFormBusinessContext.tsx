"use client";

import React from "react";
import { Lock, RefreshCw } from "lucide-react";
import { ProductFormMode } from "@/types/productForm";

interface ProductFormBusinessContextProps {
  mode: ProductFormMode;
  recordVersion: string;
  lastSyncedTime: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const ProductFormBusinessContext: React.FC<ProductFormBusinessContextProps> = ({
  mode,
  recordVersion,
  lastSyncedTime,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-[11px] shadow-2xs mb-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-700">
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Tenant:</span>{" "}
          <span className="font-bold text-gray-800">SL Beauty</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Ecosystem:</span>{" "}
          <span className="font-bold text-gray-800">Beauty Marketplace</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Business Unit:</span>{" "}
          <span className="font-bold text-gray-800">Consumer Beauty</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Sales Channels:</span>{" "}
          <span className="font-bold text-gray-800">Marketplace + Mobile App</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Region:</span>{" "}
          <span className="font-bold text-gray-800">Sri Lanka</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Default Currency:</span>{" "}
          <span className="font-bold text-gray-800">LKR</span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Form Mode:</span>{" "}
          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            {mode === "create" ? "Create" : "Edit"}
          </span>
        </div>
        <div>
          <span className="text-gray-400 font-semibold uppercase text-[9.5px]">Record Version:</span>{" "}
          <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
            {recordVersion}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-gray-500 text-[10.5px]">
          <Lock size={11} className="text-gray-400" />
          <span>Access limited to assigned business context</span>
        </div>

        <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-emerald-700">Live Data</span>
          </div>
          <span className="text-gray-400 text-[10.5px]">Last synced: {lastSyncedTime}</span>
          <button
            onClick={onRefresh}
            title="Refresh business context"
            className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin text-[#741d35]" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};
