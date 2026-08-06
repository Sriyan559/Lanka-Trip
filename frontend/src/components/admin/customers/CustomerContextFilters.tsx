"use client";

import React from "react";
import { RefreshCw, Lock, ChevronDown } from "lucide-react";

interface CustomerContextFiltersProps {
  lastSynced: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function CustomerContextFilters({
  lastSynced,
  isRefreshing,
  onRefresh,
}: CustomerContextFiltersProps) {
  return (
    <div className="bg-white border-b border-line px-6 py-2 shadow-2xs overflow-x-auto scrollbar-thin">
      <div className="flex items-center justify-between min-w-[1340px] gap-3 text-[11px]">
        {/* Left Filter Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Tenant */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tenant</span>
            <span className="font-bold text-slate-800 text-[11px] leading-tight">SL Beauty</span>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Ecosystem */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Ecosystem</span>
            <div className="flex items-center gap-1">
              <select className="bg-transparent font-bold text-slate-800 text-[11px] border-0 p-0 pr-4 focus:ring-0 cursor-pointer appearance-none">
                <option value="Beauty Marketplace">Beauty Marketplace</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 -ml-3 pointer-events-none" />
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Business Unit */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Business Unit</span>
            <div className="flex items-center gap-1">
              <select className="bg-transparent font-bold text-slate-800 text-[11px] border-0 p-0 pr-4 focus:ring-0 cursor-pointer appearance-none">
                <option value="All Business Units">All Business Units</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 -ml-3 pointer-events-none" />
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Sales Channels */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Sales Channels</span>
            <div className="flex items-center gap-1">
              <select className="bg-transparent font-bold text-slate-800 text-[11px] border-0 p-0 pr-4 focus:ring-0 cursor-pointer appearance-none">
                <option value="All Channels">All Channels</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Website">Website</option>
                <option value="B2B Portal">B2B Portal</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 -ml-3 pointer-events-none" />
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Region */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Region</span>
            <div className="flex items-center gap-1">
              <select className="bg-transparent font-bold text-slate-800 text-[11px] border-0 p-0 pr-4 focus:ring-0 cursor-pointer appearance-none">
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Western">Western Province</option>
                <option value="Central">Central Province</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 -ml-3 pointer-events-none" />
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Currency */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Currency</span>
            <span className="font-bold text-slate-800 text-[11px] leading-tight">LKR</span>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Customer Scope */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Customer Scope</span>
            <div className="flex items-center gap-1">
              <select className="bg-transparent font-bold text-slate-800 text-[11px] border-0 p-0 pr-4 focus:ring-0 cursor-pointer appearance-none">
                <option value="Active Customer Network">Active Customer Network</option>
                <option value="All Registered">All Registered</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 -ml-3 pointer-events-none" />
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Date Range */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date Range</span>
            <div className="flex items-center gap-1">
              <select className="bg-transparent font-bold text-slate-800 text-[11px] border-0 p-0 pr-4 focus:ring-0 cursor-pointer appearance-none">
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="This Quarter">This Quarter</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 -ml-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Status & Sync Indicators */}
        <div className="flex items-center gap-3.5 ml-auto text-[10.5px]">
          {/* Live Data Badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Data</span>
          </div>

          {/* Data Completeness */}
          <div className="flex items-center gap-1 text-slate-500">
            <span>Data Completeness</span>
            <span className="font-mono font-bold text-slate-800">96%</span>
          </div>

          {/* Last Synced */}
          <div className="flex items-center gap-1 text-slate-500">
            <span>Last Synced</span>
            <span className="font-semibold text-slate-700 font-mono">{lastSynced}</span>
          </div>

          {/* Access Limitation */}
          <div className="flex items-center gap-1 text-slate-400 text-[10px]">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Access limited to assigned business context</span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1 rounded text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors disabled:opacity-50"
            title="Sync live customer data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#671021]" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
