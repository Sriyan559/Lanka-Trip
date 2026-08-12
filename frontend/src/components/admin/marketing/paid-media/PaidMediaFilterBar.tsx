"use client";

import React from "react";
import { Search } from "lucide-react";

export interface PaidMediaFilterState {
  search: string;
  status: string;
  platform: string;
  objective: string;
  businessUnit: string;
  audience: string;
  creativeStatus: string;
  budgetHealth: string;
  deliveryHealth: string;
  trackingHealth: string;
  team: string;
  governance: string;
  dateRange: string;
}

export const INITIAL_PAID_MEDIA_FILTERS: PaidMediaFilterState = {
  search: "",
  status: "All",
  platform: "All",
  objective: "All",
  businessUnit: "All",
  audience: "All",
  creativeStatus: "All",
  budgetHealth: "All",
  deliveryHealth: "All",
  trackingHealth: "All",
  team: "All",
  governance: "All",
  dateRange: "Last 30 Days",
};

interface PaidMediaFilterBarProps {
  filters: PaidMediaFilterState;
  onFilterChange: (key: keyof PaidMediaFilterState, value: string) => void;
}

export function PaidMediaFilterBar({
  filters,
  onFilterChange,
}: PaidMediaFilterBarProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search paid campaign, platform ID, ad account, owner, audience..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-gray-50/70 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Campaign Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Campaign Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Paused">Paused</option>
              <option value="Limited">Limited</option>
              <option value="Draft">Draft</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Platform */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Platform</label>
            <select
              value={filters.platform}
              onChange={(e) => onFilterChange("platform", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Meta Ads">Meta Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="TikTok Ads">TikTok Ads</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          </div>

          {/* Campaign Objective */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Campaign Objective</label>
            <select
              value={filters.objective}
              onChange={(e) => onFilterChange("objective", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Sales">Sales</option>
              <option value="Conversions">Conversions</option>
              <option value="Awareness">Awareness</option>
              <option value="Traffic">Traffic</option>
              <option value="Leads">Leads</option>
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
              <option value="Beauty Enthusiasts">Beauty Enthusiasts</option>
              <option value="Premium Skincare Retargeting">Premium Skincare Retargeting</option>
              <option value="High Intent Shoppers">High Intent Shoppers</option>
              <option value="Lookalike 1% — Buyers">Lookalike 1% — Buyers</option>
              <option value="VIP Members">VIP Members</option>
            </select>
          </div>

          {/* Creative Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Creative Status</label>
            <select
              value={filters.creativeStatus}
              onChange={(e) => onFilterChange("creativeStatus", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Ready">Ready</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Review Required">Review Required</option>
              <option value="Missing">Missing</option>
            </select>
          </div>

          {/* Budget Health */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Budget Health</label>
            <select
              value={filters.budgetHealth}
              onChange={(e) => onFilterChange("budgetHealth", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
              <option value="Budget Risk">Budget Risk</option>
            </select>
          </div>

          {/* Delivery Health */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Delivery Health</label>
            <select
              value={filters.deliveryHealth}
              onChange={(e) => onFilterChange("deliveryHealth", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
              <option value="Limited">Limited</option>
            </select>
          </div>

          {/* Tracking Health */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Tracking Health</label>
            <select
              value={filters.trackingHealth}
              onChange={(e) => onFilterChange("trackingHealth", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
              <option value="Partial">Partial</option>
              <option value="Broken">Broken</option>
            </select>
          </div>

          {/* Team */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Team</label>
            <select
              value={filters.team}
              onChange={(e) => onFilterChange("team", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Growth Marketing">Growth Marketing</option>
              <option value="Performance Media">Performance Media</option>
              <option value="Acquisition Team">Acquisition Team</option>
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
