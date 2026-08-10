"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface ContextProps {
  lastSynced: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function MediaBusinessContext({ lastSynced, isRefreshing, onRefresh }: ContextProps) {
  return (
    <div className="bg-white border border-line rounded-lg px-4 py-2.5 mb-5 flex flex-wrap items-center justify-between gap-3 text-[12px] shadow-sm">
      {/* Left Context Items */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-muted">
        <div>
          <span className="font-semibold text-slate-500">Data scope: </span>
          <span className="font-bold text-ink">Authorized platform records</span>
        </div>
        <div className="w-px h-3.5 bg-line hidden sm:block" />
        <div>
          <span className="font-semibold text-slate-500">Ecosystem: </span>
          <span className="font-bold text-ink">Unavailable</span>
        </div>
        <div className="w-px h-3.5 bg-line hidden sm:block" />
        <div>
          <span className="font-semibold text-slate-500">Business Unit: </span>
          <span className="font-bold text-ink">Unavailable</span>
        </div>
        <div className="w-px h-3.5 bg-line hidden md:block" />
        <div>
          <span className="font-semibold text-slate-500">Sales Channel: </span>
          <span className="font-bold text-ink">Unavailable</span>
        </div>
        <div className="w-px h-3.5 bg-line hidden lg:block" />
        <div>
          <span className="font-semibold text-slate-500">Region: </span>
          <span className="font-bold text-ink">Unavailable</span>
        </div>
        <div className="w-px h-3.5 bg-line hidden xl:block" />
        <div>
          <span className="font-semibold text-slate-500">Currency: </span>
          <span className="font-bold text-ink">Not applicable</span>
        </div>
      </div>

      {/* Right Live Status & Sync */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-[11px] border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Near-live (30s)</span>
        </div>
        <span className="text-[11px] text-muted">Last synced: {lastSynced}</span>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 text-muted hover:text-ink hover:bg-slate-100 rounded-md transition-colors border border-line"
          title="Refresh Media Data"
        >
          <RefreshCw size={13} className={isRefreshing ? "animate-spin text-[#671021]" : ""} />
        </button>
      </div>
    </div>
  );
}
