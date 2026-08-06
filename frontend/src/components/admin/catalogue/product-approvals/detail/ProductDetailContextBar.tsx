"use client";

import React from "react";
import { Lock, RefreshCw } from "lucide-react";

export function ProductDetailContextBar() {
  return (
    <div className="flex flex-col xl:flex-row items-stretch border border-line rounded-xl bg-white mb-6 shadow-sm overflow-hidden">
      <div className="flex flex-1 flex-wrap divide-x divide-line">
        <div className="px-4 py-3 min-w-[120px] flex flex-col justify-center">
          <span className="text-[10px] text-muted mb-0.5">Tenant</span>
          <span className="text-[11px] font-bold text-ink truncate">SL Beauty</span>
        </div>
        <div className="px-4 py-3 min-w-[140px] flex flex-col justify-center">
          <span className="text-[10px] text-muted mb-0.5">Ecosystem</span>
          <span className="text-[11px] font-bold text-ink truncate">Beauty Marketplace</span>
        </div>
        <div className="px-4 py-3 min-w-[140px] flex flex-col justify-center">
          <span className="text-[10px] text-muted mb-0.5">Business Unit</span>
          <span className="text-[11px] font-bold text-ink truncate">Consumer Beauty</span>
        </div>
        <div className="px-4 py-3 min-w-[160px] flex flex-col justify-center">
          <span className="text-[10px] text-muted mb-0.5">Sales Channels</span>
          <span className="text-[11px] font-bold text-ink truncate">Marketplace, Mobile App</span>
        </div>
        <div className="px-4 py-3 min-w-[120px] flex flex-col justify-center">
          <span className="text-[10px] text-muted mb-0.5">Region</span>
          <span className="text-[11px] font-bold text-ink truncate">Sri Lanka</span>
        </div>
        <div className="px-4 py-3 min-w-[100px] flex flex-col justify-center">
          <span className="text-[10px] text-muted mb-0.5">Currency</span>
          <span className="text-[11px] font-bold text-ink truncate">LKR</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 border-t xl:border-t-0 xl:border-l border-line min-w-[340px] justify-between">
        <div className="flex items-center gap-2 text-[#059669]">
          <Lock size={12} />
          <span className="text-[10px] font-bold">Access limited to assigned business context</span>
        </div>
        <div className="flex items-center gap-4 border-l border-line pl-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#059669] mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
              <span className="text-[10px] font-bold">Live Data</span>
            </div>
            <span className="text-[9px] text-muted truncate">Last updated: 04 May 2026, 11:27 AM</span>
          </div>
          <button className="text-muted hover:text-ink transition-colors">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
