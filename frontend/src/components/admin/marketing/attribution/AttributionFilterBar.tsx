"use client";

import React from "react";
import { Search } from "lucide-react";

export interface AttributionFilterState {
  search: string;
  attributionModel: string;
  businessUnit: string;
  brand: string;
  campaign: string;
  channel: string;
  customerType: string;
  acquisitionSource: string;
  conversionType: string;
  region: string;
  dataQuality: string;
  dateRange: string;
}

export const INITIAL_ATTRIBUTION_FILTERS: AttributionFilterState = {
  search: "",
  attributionModel: "Data-Driven Attribution",
  businessUnit: "All",
  brand: "All",
  campaign: "All",
  channel: "All",
  customerType: "All",
  acquisitionSource: "All",
  conversionType: "All",
  region: "All",
  dataQuality: "All",
  dateRange: "Last 30 Days",
};

interface AttributionFilterBarProps {
  filters: AttributionFilterState;
  onFilterChange: (key: keyof AttributionFilterState, value: string) => void;
}

export function AttributionFilterBar({
  filters,
  onFilterChange,
}: AttributionFilterBarProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaign, channel, journey, audience, content..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-gray-50/70 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Attribution Model */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Attribution Model</label>
            <select
              value={filters.attributionModel}
              onChange={(e) => onFilterChange("attributionModel", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-900 font-bold focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="Data-Driven Attribution">Data-Driven Attribution</option>
              <option value="First Touch">First Touch</option>
              <option value="Last Touch">Last Touch</option>
              <option value="Linear">Linear</option>
              <option value="Position Based">Position Based</option>
              <option value="Time Decay">Time Decay</option>
            </select>
          </div>

          {/* Business Unit */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Business Unit</label>
            <select
              value={filters.businessUnit}
              onChange={(e) => onFilterChange("businessUnit", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="All Business Units">All Business Units</option>
              <option value="Beauty Enterprise">Beauty Enterprise</option>
              <option value="App & Loyalty">App & Loyalty</option>
            </select>
          </div>

          {/* Brand */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => onFilterChange("brand", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="All Brands">All Brands</option>
              <option value="SL Beauty">SL Beauty</option>
            </select>
          </div>

          {/* Campaign */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Campaign</label>
            <select
              value={filters.campaign}
              onChange={(e) => onFilterChange("campaign", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Summer Beauty Festival">Summer Beauty Festival</option>
              <option value="Premium Skincare for Everyone">Premium Skincare</option>
              <option value="New Customer Acquisition">New Customer Acquisition</option>
            </select>
          </div>

          {/* Channel */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Channel</label>
            <select
              value={filters.channel}
              onChange={(e) => onFilterChange("channel", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Paid Search">Paid Search</option>
              <option value="Paid Social">Paid Social</option>
              <option value="Email">Email</option>
              <option value="Web/App">Web/App</option>
              <option value="Paid Shopping">Paid Shopping</option>
              <option value="SMS">SMS</option>
            </select>
          </div>

          {/* Customer Type */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Customer Type</label>
            <select
              value={filters.customerType}
              onChange={(e) => onFilterChange("customerType", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="New Customers">New Customers</option>
              <option value="Repeat Customers">Repeat Customers</option>
              <option value="Loyal Customers">Loyal Customers</option>
            </select>
          </div>

          {/* Acquisition Source */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Acquisition Source</label>
            <select
              value={filters.acquisitionSource}
              onChange={(e) => onFilterChange("acquisitionSource", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Meta Prospecting">Meta Prospecting</option>
              <option value="Google Search">Google Search</option>
              <option value="Retargeting">Retargeting</option>
              <option value="Referral Assisted">Referral Assisted</option>
            </select>
          </div>

          {/* Conversion Type */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Conversion Type</label>
            <select
              value={filters.conversionType}
              onChange={(e) => onFilterChange("conversionType", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Purchase / Order">Purchase / Order</option>
              <option value="Signup">Signup</option>
              <option value="Lead">Lead</option>
            </select>
          </div>

          {/* Region */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Region</label>
            <select
              value={filters.region}
              onChange={(e) => onFilterChange("region", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Sri Lanka">Sri Lanka</option>
            </select>
          </div>

          {/* Data Quality */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Data Quality</label>
            <select
              value={filters.dataQuality}
              onChange={(e) => onFilterChange("dataQuality", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange("dateRange", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="FY2026">FY2026</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
