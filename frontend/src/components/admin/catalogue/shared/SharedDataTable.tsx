"use client";

import React from "react";
import { Search, Filter, Save, RefreshCw, ChevronDown, MoreVertical } from "lucide-react";

export interface SharedDataTableTab {
  label: string;
  count: string | null;
  active: boolean;
}

interface SharedDataTableProps {
  tabs: SharedDataTableTab[];
  searchPlaceholder?: string;
  filters: string[];
  itemCountLabel: string;
  children: React.ReactNode;
  showSaveView?: boolean;
  showRefresh?: boolean;
  onClearAll?: () => void;
  onSaveView?: () => void;
  onRefresh?: () => void;
}

export function SharedDataTable({
  tabs,
  searchPlaceholder = "Search...",
  filters,
  itemCountLabel,
  children,
  showSaveView = true,
  showRefresh = true,
  onClearAll,
  onSaveView,
  onRefresh,
}: SharedDataTableProps) {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm flex flex-col">
      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="flex items-center gap-6 px-4 border-b border-line overflow-x-auto scrollbar-none">
          {tabs.map((tab, i) => (
            <button key={i} className={`flex items-center gap-1.5 py-3 text-[12px] font-bold border-b-2 whitespace-nowrap transition-colors ${tab.active ? 'border-[#741d35] text-[#741d35]' : 'border-transparent text-muted hover:text-ink'}`}>
              {tab.label}
              {tab.count && (
                <span className={`text-[10px] font-bold ml-1 ${tab.active ? 'text-[#741d35]' : 'text-muted'}`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Filter Bar */}
      <div className="p-4 border-b border-line">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
            <input 
              type="text" 
              placeholder={searchPlaceholder} 
              className="w-full h-9 pl-9 pr-3 rounded border border-line text-[12px] focus:outline-none focus:border-blue-500"
            />
          </div>
          
          {filters.map(filter => (
            <div key={filter} className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-muted ml-1">{filter}</span>
              <button className="h-9 px-3 rounded border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center justify-between gap-3 min-w-[120px] whitespace-nowrap bg-white">
                {filter.toLowerCase().includes('date') ? 'Select date range' : 'All'} <ChevronDown size={12} className="text-muted" />
              </button>
            </div>
          ))}
          
          <div className="flex flex-col gap-1 mt-4">
             <button className="h-9 px-3 rounded border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 whitespace-nowrap bg-white">
               <Filter size={12} /> More Filters
             </button>
          </div>
          
          <div className="flex-1 mt-4 min-w-[20px]"></div>
          
          <div className="flex items-center gap-2 mt-4">
            <button onClick={onClearAll} className="text-[11px] font-bold text-[#741d35] hover:underline px-2 whitespace-nowrap">Clear All</button>
            {showSaveView && (
              <button onClick={onSaveView} className="h-9 px-3 rounded border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 whitespace-nowrap bg-white">
                <Save size={12} /> Save View
              </button>
            )}
            {showRefresh && (
              <button onClick={onRefresh} className="h-9 px-3 rounded bg-[#741d35] text-white text-[11px] font-bold hover:bg-[#5a1629] flex items-center gap-1.5 whitespace-nowrap">
                <RefreshCw size={12} /> Refresh
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {children}
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 border-t border-line flex items-center justify-between">
        <span className="text-[11px] font-semibold text-muted">Showing 1 to 6 of {itemCountLabel}</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-muted hover:bg-slate-50">&lt;</button>
          <button className="w-6 h-6 flex items-center justify-center rounded bg-[#741d35] text-white text-[11px] font-bold">1</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-ink text-[11px] hover:bg-slate-50 font-medium">2</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-ink text-[11px] hover:bg-slate-50 font-medium">3</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-ink text-[11px] hover:bg-slate-50 font-medium">4</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-ink text-[11px] hover:bg-slate-50 font-medium">5</button>
          <span className="px-1 text-muted">...</span>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-ink text-[11px] hover:bg-slate-50 font-medium">81</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-muted hover:bg-slate-50">&gt;</button>
          <div className="ml-2 flex items-center gap-1 text-[11px] font-medium text-ink border border-line rounded px-2 h-6">
            25 / page <ChevronDown size={12} className="text-muted ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
