"use client";

import React from "react";
import { Search } from "lucide-react";

export interface PlacementFilterState {
  search: string;
  status: string;
  surface: string;
  type: string;
  campaign: string;
  audience: string;
  contentStatus: string;
  device: string;
  businessUnit: string;
  governance: string;
  dateRange: string;
}

export const INITIAL_PLACEMENT_FILTERS: PlacementFilterState = {
  search: "",
  status: "All",
  surface: "All",
  type: "All",
  campaign: "All",
  audience: "All",
  contentStatus: "All",
  device: "All",
  businessUnit: "All",
  governance: "All",
  dateRange: "Last 30 Days",
};

interface PlacementFilterBarProps {
  filters: PlacementFilterState;
  onFilterChange: (key: keyof PlacementFilterState, value: string) => void;
}

export function PlacementFilterBar({
  filters,
  onFilterChange,
}: PlacementFilterBarProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search placements..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-gray-50/70 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Placement Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Placement Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Paused">Paused</option>
              <option value="Draft">Draft</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          {/* Surface */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Surface</label>
            <select
              value={filters.surface}
              onChange={(e) => onFilterChange("surface", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Website">Website</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Website Search">Website Search</option>
              <option value="Landing Page">Landing Page</option>
            </select>
          </div>

          {/* Placement Type */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Placement Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange("type", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Hero Banner">Hero Banner</option>
              <option value="App Home Card">App Home Card</option>
              <option value="Category Spotlight">Category Spotlight</option>
              <option value="Search Merchandiser">Search Merchandiser</option>
              <option value="Modal">Modal</option>
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
              <option value="Premium Skincare Re-Engagement">Premium Skincare</option>
              <option value="Haircare Launch">Haircare Launch</option>
              <option value="Summer Offer Campaign">Summer Offer</option>
              <option value="Loyalty VIP Program">Loyalty VIP</option>
            </select>
          </div>

          {/* Audience */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Audience</label>
            <select
              value={filters.audience}
              onChange={(e) => onFilterChange("audience", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="All Marketable Customers">All Marketable Customers</option>
              <option value="Premium Skincare Buyers App Card v2">Premium Skincare Buyers</option>
              <option value="Haircare Interested Customers">Haircare Interested</option>
              <option value="All Shoppers">All Shoppers</option>
              <option value="VIP Customers">VIP Customers</option>
              <option value="New Visitors">New Visitors</option>
            </select>
          </div>

          {/* Content Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Content Status</label>
            <select
              value={filters.contentStatus}
              onChange={(e) => onFilterChange("contentStatus", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Ready">Ready</option>
              <option value="Pending">Pending</option>
              <option value="Warning">Warning</option>
            </select>
          </div>

          {/* Device */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Device</label>
            <select
              value={filters.device}
              onChange={(e) => onFilterChange("device", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Desktop + Mobile">Desktop + Mobile</option>
              <option value="iOS + Android">iOS + Android</option>
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
              <option value="Beauty Enterprise">Beauty Enterprise</option>
              <option value="App & Loyalty">App & Loyalty</option>
              <option value="Customer Engagement">Customer Engagement</option>
              <option value="Loyalty & Retention">Loyalty & Retention</option>
            </select>
          </div>

          {/* Governance */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Governance</label>
            <select
              value={filters.governance}
              onChange={(e) => onFilterChange("governance", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Clear">Clear</option>
              <option value="Review Required">Review Required</option>
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
              <option value="This Quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
