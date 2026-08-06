"use client";

import React, { useState } from "react";
import { RefreshCw, Calendar, ChevronDown, RotateCcw } from "lucide-react";
import { BusinessContextFilter } from "@/types/catalogue";

interface CatalogueContextFiltersProps {
  filters: BusinessContextFilter;
  onChange: (updated: Partial<BusinessContextFilter>) => void;
  onReset: () => void;
}

export const CatalogueContextFilters: React.FC<CatalogueContextFiltersProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("04 Aug 2026, 12:57 AM");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const formatted = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + ", " + now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setLastUpdated(formatted);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[12px]">
      <div className="flex flex-wrap items-center gap-4">
        {/* Tenant */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-medium">Tenant</span>
          <select
            value={filters.tenant}
            onChange={(e) => onChange({ tenant: e.target.value })}
            className="bg-transparent font-semibold text-gray-800 cursor-pointer focus:outline-none border-none py-0.5 pr-1"
          >
            <option value="SL Beauty">SL Beauty</option>
            <option value="Global Beauty Corp">Global Beauty Corp</option>
          </select>
        </div>

        <div className="w-px h-3.5 bg-gray-200" />

        {/* Ecosystem */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-medium">Ecosystem</span>
          <select
            value={filters.ecosystem}
            onChange={(e) => onChange({ ecosystem: e.target.value })}
            className="bg-transparent font-semibold text-gray-800 cursor-pointer focus:outline-none border-none py-0.5 pr-1"
          >
            <option value="Beauty Marketplace">Beauty Marketplace</option>
            <option value="Wholesale Portal">Wholesale Portal</option>
          </select>
        </div>

        <div className="w-px h-3.5 bg-gray-200" />

        {/* Business Unit */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-medium">Business Unit</span>
          <select
            value={filters.businessUnit}
            onChange={(e) => onChange({ businessUnit: e.target.value })}
            className="bg-transparent font-semibold text-gray-800 cursor-pointer focus:outline-none border-none py-0.5 pr-1"
          >
            <option value="All Business Units">All Business Units</option>
            <option value="Consumer Care">Consumer Care</option>
            <option value="Luxury Products">Luxury Products</option>
            <option value="Professional Salon">Professional Salon</option>
          </select>
        </div>

        <div className="w-px h-3.5 bg-gray-200" />

        {/* Sales Channel */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-medium">Sales Channel</span>
          <select
            value={filters.salesChannel}
            onChange={(e) => onChange({ salesChannel: e.target.value })}
            className="bg-transparent font-semibold text-gray-800 cursor-pointer focus:outline-none border-none py-0.5 pr-1"
          >
            <option value="All Channels">All Channels</option>
            <option value="Online Storefront">Online Storefront</option>
            <option value="Mobile App">Mobile App</option>
            <option value="B2B Portal">B2B Portal</option>
          </select>
        </div>

        <div className="w-px h-3.5 bg-gray-200" />

        {/* Region */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-medium">Region</span>
          <select
            value={filters.region}
            onChange={(e) => onChange({ region: e.target.value })}
            className="bg-transparent font-semibold text-gray-800 cursor-pointer focus:outline-none border-none py-0.5 pr-1"
          >
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="South Asia">South Asia</option>
            <option value="Global">Global</option>
          </select>
        </div>

        <div className="w-px h-3.5 bg-gray-200" />

        {/* Default Currency */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-medium">Default Currency</span>
          <select
            value={filters.currency}
            onChange={(e) => onChange({ currency: e.target.value })}
            className="bg-transparent font-semibold text-gray-800 cursor-pointer focus:outline-none border-none py-0.5 pr-1"
          >
            <option value="LKR">LKR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div className="w-px h-3.5 bg-gray-200" />

        {/* Date Range */}
        <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
          <Calendar size={13} className="text-gray-500" />
          <span className="text-gray-500 font-medium">Date Range</span>
          <select
            value={filters.dateRange}
            onChange={(e) => onChange({ dateRange: e.target.value })}
            className="bg-transparent font-semibold text-gray-900 cursor-pointer focus:outline-none border-none pr-1"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 90 Days">Last 90 Days</option>
            <option value="Year to Date">Year to Date</option>
          </select>
        </div>

        <button
          onClick={onReset}
          className="text-gray-400 hover:text-gray-700 flex items-center gap-1 font-medium transition-colors"
          title="Reset all filters"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Live Data & Refresh */}
      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-gray-900 text-[11px]">Live Data</span>
        </div>
        <span className="text-[11px] text-gray-400">
          Last updated: <span className="font-medium text-gray-600">{lastUpdated}</span>
        </span>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-50"
          title="Refresh data"
        >
          <RefreshCw size={13} className={isRefreshing ? "animate-spin text-[#741d35]" : ""} />
        </button>
      </div>
    </div>
  );
};
