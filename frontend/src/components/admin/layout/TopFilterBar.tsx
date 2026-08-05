import React from "react";
import { RefreshCw } from "lucide-react";

export function TopFilterBar() {
  return (
    <div className="bg-white border-b border-line px-6 py-3 flex items-center justify-between overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-8 min-w-max">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted">Tenant</span>
          <span className="text-[12px] font-bold text-ink">SL Beauty</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted">Ecosystem</span>
          <span className="text-[12px] font-bold text-ink">Beauty Marketplace</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted">Business Unit</span>
          <span className="text-[12px] font-bold text-ink">All Business Units</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted">Sales Channel</span>
          <span className="text-[12px] font-bold text-ink">All Channels</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted">Region</span>
          <span className="text-[12px] font-bold text-ink">Sri Lanka</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted">Currency</span>
          <span className="text-[12px] font-bold text-ink">LKR</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 min-w-max ml-8">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[11px] font-bold text-green-700">Live Data</span>
          </div>
          <span className="text-[10px] text-muted font-medium">Last synced: 04 Aug 2026, 12:57 AM</span>
        </div>
        <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-ink transition-colors">
          <RefreshCw size={14} />
        </button>
      </div>
    </div>
  );
}
