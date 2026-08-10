"use client";

import React from "react";
import { RefreshCw, Calendar, RotateCcw } from "lucide-react";
import { BusinessContextFilter } from "@/types/catalogue";

interface Props {
  filters: BusinessContextFilter;
  onChange: (updated: Partial<BusinessContextFilter>) => void;
  onReset: () => void;
  options: Record<string, Array<{ value: string; label: string }>>;
  unsupportedFilters: string[];
  lastUpdated: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const fields: Array<[keyof BusinessContextFilter, string]> = [
  ["tenant", "Tenant"], ["ecosystem", "Ecosystem"], ["businessUnit", "Business Unit"],
  ["salesChannel", "Sales Channel"], ["region", "Region"], ["currency", "Default Currency"],
];

export const CatalogueContextFilters: React.FC<Props> = ({ filters, onChange, onReset, options, unsupportedFilters, lastUpdated, isRefreshing, onRefresh }) => (
  <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[12px]">
    <div className="flex flex-wrap items-center gap-4">
      {fields.map(([key, label], index) => {
        const choices = options[key] ?? [];
        const unsupported = unsupportedFilters.includes(key);
        return <React.Fragment key={key}>{index > 0 && <div className="w-px h-3.5 bg-gray-200" />}<div className="flex items-center gap-1.5" title={unsupported ? "This dimension is not modelled in the current catalogue schema." : undefined}>
          <span className="text-gray-400 font-medium">{label}</span>
          <select aria-label={label} value={filters[key]} disabled={unsupported || choices.length === 0} onChange={(e) => onChange({ [key]: e.target.value })} className="bg-transparent font-semibold text-gray-800 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none border-none py-0.5 pr-1">
            {choices.length ? choices.map((option) => <option key={option.value} value={option.value}>{option.label}</option>) : <option value={filters[key]}>{filters[key] || "Unavailable"}</option>}
          </select>
        </div></React.Fragment>;
      })}
      <div className="w-px h-3.5 bg-gray-200" />
      <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
        <Calendar size={13} className="text-gray-500" /><span className="text-gray-500 font-medium">Date Range</span>
        <select aria-label="Date Range" value={filters.dateRange} onChange={(e) => onChange({ dateRange: e.target.value })} className="bg-transparent font-semibold text-gray-900 cursor-pointer focus:outline-none border-none pr-1">
          <option>Last 7 Days</option><option>Last 30 Days</option><option>Last 90 Days</option>
        </select>
      </div>
      <button onClick={onReset} className="text-gray-400 hover:text-gray-700 flex items-center gap-1 font-medium"><RotateCcw size={12} />Reset</button>
    </div>
    <div className="flex items-center gap-3 ml-auto">
      <div className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${isRefreshing ? "bg-amber-500" : "bg-emerald-500"}`} /><span className="font-bold text-gray-900 text-[11px]">{isRefreshing ? "Refreshing" : "Live Data"}</span></div>
      <span className="text-[11px] text-gray-400">Last updated: <span className="font-medium text-gray-600">{new Date(lastUpdated).toLocaleString()}</span></span>
      <button onClick={onRefresh} disabled={isRefreshing} className="p-1 rounded hover:bg-gray-100 text-gray-500 disabled:opacity-50" title="Refresh data"><RefreshCw size={13} className={isRefreshing ? "animate-spin text-[#741d35]" : ""} /></button>
    </div>
  </div>
);
